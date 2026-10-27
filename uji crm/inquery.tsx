import { createHmac, randomBytes } from "node:crypto";

const MARKA_URL = process.env.MARKA_CRM_WEBHOOK_URL!;
const INTEGRATION_ID = process.env.MARKA_CRM_INTEGRATION_ID!;
const KEY_ID = process.env.MARKA_CRM_KEY_ID!;
const SIGNING_SECRET = process.env.MARKA_CRM_SIGNING_SECRET!;
const PATH = "/api/v1/integrations/webhooks/events";

export async function sendMarkaEvent(eventId: string, eventType: string, data: object) {
  // eventId harus berasal dari ID submission/outbox yang disimpan; jangan ganti saat retry.
  const occurredAt = new Date().toISOString();
  const body = JSON.stringify({
    event_id: eventId,
    event_type: eventType,
    schema_version: 1,
    occurred_at: occurredAt,
    timestamp: Math.floor(Date.now() / 1000),
    data,
  });

  for (let attempt = 1; attempt <= 3; attempt++) {
    const timestamp = String(Math.floor(Date.now() / 1000));
    const nonce = randomBytes(16).toString("hex");
    const prefix = `v1\nPOST\n${PATH}\n${timestamp}\n${nonce}\n`;
    const signature = createHmac("sha256", SIGNING_SECRET)
      .update(Buffer.from(prefix, "utf8"))
      .update(Buffer.from(body, "utf8"))
      .digest("hex");

    let response: Response;
    try {
      response = await fetch(MARKA_URL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "X-Integration-Id": INTEGRATION_ID,
          "X-Integration-Key-Id": KEY_ID,
          "X-Integration-Timestamp": timestamp,
          "X-Integration-Nonce": nonce,
          "X-Integration-Signature": signature,
        },
        body,
        signal: AbortSignal.timeout(8000),
      });
    } catch (error) {
      if (attempt === 3) throw error;
      await new Promise((resolve) => setTimeout(resolve, 300 * 2 ** (attempt - 1)));
      continue;
    }

    if (response.status === 200 || response.status === 202) return response.json();
    if (response.status < 500 && response.status !== 408 && response.status !== 429) {
      throw new Error(`Marka rejected event: HTTP ${response.status} ${await response.text()}`);
    }
    if (attempt === 3) throw new Error(`Marka unavailable after retries: HTTP ${response.status}`);
    await new Promise((resolve) => setTimeout(resolve, 300 * 2 ** (attempt - 1)));
  }
}