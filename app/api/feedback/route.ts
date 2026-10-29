import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { sendMarkaEvent } from "@/lib/marka-crm";
import { sendFeedbackNotification } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const customerCode =
      body.customerCode ||
      body.customer_code ||
      body.party_code ||
      body.customerPartyId ||
      body.customer_party_id;
    const { rating, feedbackText, salesOrderId } = body;

    if (!customerCode || rating === undefined || rating === null) {
      return NextResponse.json(
        { error: "Customer code and rating (1-5) are required" },
        { status: 400 }
      );
    }

    const numRating = Number(rating);
    if (isNaN(numRating) || numRating < 1 || numRating > 5) {
      return NextResponse.json(
        { error: "Rating must be a number between 1 and 5" },
        { status: 400 }
      );
    }

    const eventId = `fb-${Date.now()}-${randomUUID().slice(0, 8)}`;

    // Send email notification to corporate@adsvar.id using Google SMTP
    try {
      await sendFeedbackNotification({
        customerCode: String(customerCode).trim(),
        rating: numRating,
        feedbackText: feedbackText ? String(feedbackText).trim() : "",
        salesOrderId: salesOrderId && String(salesOrderId).trim() ? String(salesOrderId).trim() : undefined,
      });
    } catch (mailErr) {
      console.warn("Failed to dispatch feedback email notification:", mailErr);
    }

    const result = await sendMarkaEvent(eventId, "feedback.submitted", {
      customer_code: String(customerCode).trim(),
      rating: numRating,
      feedback_text: feedbackText ? String(feedbackText).trim() : "",
      feedback_type: "CUSTOMER_REVIEW",
      ...(salesOrderId && String(salesOrderId).trim()
        ? { sales_order_id: String(salesOrderId).trim() }
        : {}),
    });

    return NextResponse.json(
      {
        success: result.success,
        eventId,
        status: result.status,
        markaResponse: result.data || result.error,
      },
      { status: result.success ? 202 : result.status || 500 }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to submit feedback";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
