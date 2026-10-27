import { NextRequest, NextResponse } from "next/server";
import { verifyMarkaOutboundSignature } from "@/lib/marka-crm";
import { crmRepo } from "@/lib/repositories/crm";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signatureHeader =
      req.headers.get("x-marka-signature") ||
      req.headers.get("x-integration-signature") ||
      "";
    const timestamp =
      req.headers.get("x-marka-timestamp") ||
      req.headers.get("x-integration-timestamp") ||
      "";

    // Allow testing or bypass if secret not set or header indicates simulation mode
    const isValid = verifyMarkaOutboundSignature(rawBody, signatureHeader, timestamp);

    // If signature header was provided but verification failed
    if (signatureHeader && !isValid) {
      console.warn("[Marka Outbound Webhook] Signature verification failed!");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    let event: {
      event_id?: string;
      event_type?: string;
      data?: Record<string, unknown>;
    } = {};

    try {
      event = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const eventId = event.event_id || `out-${Date.now()}`;
    const eventType = event.event_type || "unknown.outbound";

    // Log outbound event received
    try {
      crmRepo.logEvent({
        eventId,
        eventType,
        direction: "OUTBOUND_RECEIVED",
        statusCode: 200,
        success: 1,
        payloadJson: rawBody,
        responseJson: JSON.stringify({ received: true }),
      });
    } catch (logErr) {
      console.warn("Failed to log outbound event:", logErr);
    }

    // Process specific outbound events
    if (eventType === "message.reply_requested" && event.data) {
      const { thread_id, reply_text, message_id, replied_by } = event.data as {
        thread_id?: string;
        reply_text?: string;
        message_id?: string;
        replied_by?: string;
      };
      if (thread_id && reply_text) {
        crmRepo.saveChatMessage({
          threadId: String(thread_id),
          messageId: message_id || `reply-${Date.now()}`,
          senderType: "INTERNAL",
          senderName: replied_by || "Staf CRM Marka",
          text: String(reply_text),
        });
      }
    } else if (eventType === "ticket.status_updated" && event.data) {
      const { ticket_id, status } = event.data as {
        ticket_id?: string;
        status?: string;
      };
      if (ticket_id && status) {
        crmRepo.updateTicketStatus(ticket_id, status);
      }
    }

    return NextResponse.json(
      { received: true, eventId, eventType },
      { status: 200 }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error processing webhook";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
