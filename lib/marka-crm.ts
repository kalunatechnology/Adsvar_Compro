import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { crmRepo } from "@/lib/repositories/crm";

export interface MarkaConfig {
  webhookUrl: string;
  integrationId: string;
  keyId: string;
  signingSecret: string;
  publicOriginDomain: string;
  outboundSecret?: string;
}

export function getMarkaConfig(): MarkaConfig {
  return {
    webhookUrl: (
      process.env.MARKA_CRM_WEBHOOK_URL ||
      "https://lavender-alligator-903719.hostingersite.com/api/v1/integrations/webhooks/events"
    )
      .trim()
      .replace(/^["']|["']$/g, ""),
    integrationId: (
      process.env.MARKA_CRM_INTEGRATION_ID || "86976ab9-bf62-45b0-aaf1-744f47a12919"
    )
      .trim()
      .replace(/^["']|["']$/g, ""),
    keyId: (process.env.MARKA_CRM_KEY_ID || "k_b85ceec3bff98094")
      .trim()
      .replace(/^["']|["']$/g, ""),
    signingSecret: (
      process.env.MARKA_CRM_SIGNING_SECRET ||
      "XMdvhLCBV4HTMVgLfut3QNhSpW2W5hAffqTh1w8F9n8"
    )
      .trim()
      .replace(/^["']|["']$/g, ""),
    publicOriginDomain: (
      process.env.PUBLIC_ORIGIN_DOMAIN || "www.adsvar.id"
    )
      .trim()
      .replace(/^["']|["']$/g, ""),
    outboundSecret: (
      process.env.MARKA_OUTBOUND_SIGNING_SECRET ||
      "adsvar_marka_outbound_secret_2026"
    )
      .trim()
      .replace(/^["']|["']$/g, ""),
  };
}

export interface MarkaSendResult {
  success: boolean;
  status: number;
  event_id: string;
  duplicate?: boolean;
  data?: unknown;
  error?: string | unknown;
  attempts: number;
  latencyMs: number;
  requestHeaders?: Record<string, string>;
  requestPayload?: unknown;
}

export async function sendMarkaEvent(
  eventId: string,
  eventType: string,
  data: Record<string, unknown>,
  customConfig?: Partial<MarkaConfig>
): Promise<MarkaSendResult> {
  const config = { ...getMarkaConfig(), ...customConfig };
  const startTime = Date.now();

  const urlObj = new URL(config.webhookUrl);
  const path = urlObj.pathname || "/api/v1/integrations/webhooks/events";

  // Ensure origin_domain is present in data
  const finalData: Record<string, unknown> = {
    origin_domain: config.publicOriginDomain,
    ...data,
  };

  const bodyObj = {
    event_id: eventId,
    event_type: eventType,
    schema_version: 1,
    occurred_at: new Date().toISOString(),
    timestamp: Math.floor(Date.now() / 1000),
    data: finalData,
  };

  const body = JSON.stringify(bodyObj);

  let lastStatus = 0;
  let lastError: unknown = null;
  let responseData: unknown = null;
  let recordedHeaders: Record<string, string> = {};

  for (let attempt = 1; attempt <= 3; attempt++) {
    const timestamp = String(Math.floor(Date.now() / 1000));
    const nonce = randomBytes(16).toString("hex");
    const prefix = `v1\nPOST\n${path}\n${timestamp}\n${nonce}\n`;

    const signature = createHmac("sha256", config.signingSecret)
      .update(Buffer.from(prefix, "utf8"))
      .update(Buffer.from(body, "utf8"))
      .digest("hex");

    recordedHeaders = {
      "Content-Type": "application/json",
      "X-Integration-Id": config.integrationId,
      "X-Integration-Key-Id": config.keyId,
      "X-Integration-Timestamp": timestamp,
      "X-Integration-Nonce": nonce,
      "X-Integration-Signature": signature,
    };

    try {
      const response = await fetch(config.webhookUrl, {
        method: "POST",
        headers: recordedHeaders,
        body,
        signal: AbortSignal.timeout(8000),
      });

      lastStatus = response.status;
      const responseText = await response.text();

      try {
        responseData = JSON.parse(responseText);
      } catch {
        responseData = responseText;
      }

      if (response.status === 200 || response.status === 202) {
        const latencyMs = Date.now() - startTime;
        const result: MarkaSendResult = {
          success: true,
          status: response.status,
          event_id: eventId,
          data: responseData,
          attempts: attempt,
          latencyMs,
          requestHeaders: recordedHeaders,
          requestPayload: bodyObj,
        };

        // Log to local DB
        try {
          crmRepo.logEvent({
            eventId,
            eventType,
            direction: "INBOUND_DISPATCHED",
            statusCode: response.status,
            success: 1,
            payloadJson: JSON.stringify(bodyObj),
            responseJson: JSON.stringify(responseData),
          });
        } catch (logErr) {
          console.warn("[CRM Logger] Failed to write event log:", logErr);
        }

        return result;
      }

      // Do not retry client errors (4xx) except 408 (Timeout) and 429 (Rate Limit)
      if (
        response.status < 500 &&
        response.status !== 408 &&
        response.status !== 429
      ) {
        lastError = responseData;
        break;
      }

      lastError = responseData;
      if (attempt === 3) break;
    } catch (err: unknown) {
      lastError = err instanceof Error ? err.message : String(err);
      if (attempt === 3) break;
    }

    // Exponential backoff: 300ms, 600ms
    await new Promise((resolve) =>
      setTimeout(resolve, 300 * Math.pow(2, attempt - 1))
    );
  }

  const latencyMs = Date.now() - startTime;
  const failureResult: MarkaSendResult = {
    success: false,
    status: lastStatus || 500,
    event_id: eventId,
    error: lastError,
    attempts: 3,
    latencyMs,
    requestHeaders: recordedHeaders,
    requestPayload: bodyObj,
  };

  try {
    crmRepo.logEvent({
      eventId,
      eventType,
      direction: "INBOUND_DISPATCHED",
      statusCode: lastStatus || 500,
      success: 0,
      payloadJson: JSON.stringify(bodyObj),
      responseJson: JSON.stringify(lastError),
    });
  } catch (logErr) {
    console.warn("[CRM Logger] Failed to write failure log:", logErr);
  }

  return failureResult;
}

export function verifyMarkaOutboundSignature(
  rawBody: string,
  signatureHeader: string,
  timestamp: string,
  secretOverride?: string
): boolean {
  const secret = secretOverride || getMarkaConfig().outboundSecret;
  if (!secret) return false;

  const prefix = `v1\nPOST\n${timestamp}\n`;
  const expectedSignature =
    "sha256=" +
    createHmac("sha256", secret)
      .update(Buffer.from(prefix + rawBody, "utf8"))
      .digest("hex");

  try {
    const a = Buffer.from(signatureHeader);
    const b = Buffer.from(expectedSignature);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export async function fetchMarkaPortalData(
  type: "quotations" | "tickets",
  id: string,
  token: string
) {
  const baseUrl = getMarkaConfig().webhookUrl.replace(
    /\/api\/v1\/integrations\/webhooks\/events.*/,
    ""
  );
  const endpoint = `${baseUrl}/api/v1/portal/${type}/${id}`;

  const res = await fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    signal: AbortSignal.timeout(8000),
  });

  const text = await res.text();
  let json: unknown = null;
  try {
    json = JSON.parse(text);
  } catch {
    json = text;
  }

  return {
    status: res.status,
    ok: res.ok,
    data: json,
  };
}
