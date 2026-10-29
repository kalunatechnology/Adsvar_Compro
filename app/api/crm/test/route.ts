import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { getMarkaConfig, sendMarkaEvent } from "@/lib/marka-crm";

export async function GET() {
  const config = getMarkaConfig();
  const isConfigured = Boolean(
    config.webhookUrl &&
      config.integrationId &&
      config.keyId &&
      config.signingSecret &&
      config.publicOriginDomain
  );

  return NextResponse.json({
    status: isConfigured ? "CONFIGURED" : "INCOMPLETE",
    config: {
      webhookUrl: config.webhookUrl,
      integrationId: config.integrationId,
      keyId: config.keyId,
      publicOriginDomain: config.publicOriginDomain,
      signingSecretMasked: config.signingSecret
        ? `${config.signingSecret.slice(0, 4)}...${config.signingSecret.slice(-4)}`
        : "(empty)",
      outboundSecretMasked: config.outboundSecret
        ? `${config.outboundSecret.slice(0, 4)}...`
        : "(empty)",
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const testType = body.type || "all"; // 'inquiry' | 'chat' | 'ticket' | 'feedback' | 'quotation' | 'all'

    const results: Record<string, unknown> = {};

    // 1. Inquiry test
    if (testType === "all" || testType === "inquiry") {
      const eventId = `test-inq-${Date.now()}`;
      results.inquiry = await sendMarkaEvent(eventId, "inquiry.submitted", {
        customer: {
          name: "Adsvar Automated Tester",
          email: "tester.adsvar@example.com",
          phone: "081234567890",
        },
        requirements: {
          subject: "Adsvar CRM Integration Test",
          description: "Automated test message from Adsvar Diagnostic Test Suite",
          target_budget: 7500000,
        },
      });
    }

    // 2. Chat message test
    if (testType === "all" || testType === "chat") {
      const eventId = `test-chat-${Date.now()}`;
      results.chat = await sendMarkaEvent(eventId, "message.received", {
        thread_id: "webchat:test-suite-visitor",
        message_id: `m-test-${Date.now()}`,
        sender: {
          type: "EXTERNAL",
          value: "test-suite-visitor",
          display_name: "Live Chat Tester",
        },
        message: {
          type: "TEXT",
          text: "Test trial message from Adsvar Live Chatbox to Marka CRM",
        },
      });
    }

    // 3. Ticket test
    if (testType === "all" || testType === "ticket") {
      const eventId = `test-tkt-${Date.now()}`;
      results.ticket = await sendMarkaEvent(eventId, "ticket.created", {
        subject: "Adsvar Support & Warranty Ticket Test",
        description: "Simulated issue for testing CRM ticket workflow",
        serial_number: "ADS-TEST-9988",
        customer_email: "tester.adsvar@example.com",
      });
    }

    // 4. Feedback test
    if (testType === "all" || testType === "feedback") {
      const eventId = `test-fb-${Date.now()}`;
      const customerCode =
        body.customerCode ||
        body.customer_code ||
        body.party_code ||
        "CUST-BRIDAK-058769";
      const fbResult = await sendMarkaEvent(eventId, "feedback.submitted", {
        customer_code: String(customerCode).trim(),
        rating: 5,
        feedback_text: "Outstanding service, modern and high performance website!",
        feedback_type: "CUSTOMER_REVIEW",
      });
      results.feedback = fbResult;
    }

    // 5. Quotation decision test
    if (testType === "all" || testType === "quotation") {
      const eventId = `test-quo-${Date.now()}`;
      const targetQuotationId = body.quotationId || randomUUID();
      results.quotation = await sendMarkaEvent(eventId, "quotation.decision", {
        quotation_id: targetQuotationId,
        decision: "ACCEPTED",
        reason: "Approved via Adsvar test console",
      });
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      results,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error executing tests";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
