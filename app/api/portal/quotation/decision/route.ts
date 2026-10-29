import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { sendMarkaEvent } from "@/lib/marka-crm";

export async function POST(req: NextRequest) {
  try {
    const { quotationId, decision, reason } = await req.json();

    if (!quotationId || !decision) {
      return NextResponse.json(
        { error: "quotationId and decision (ACCEPTED / REJECTED) are required" },
        { status: 400 }
      );
    }

    const cleanDecision = String(decision).toUpperCase().trim();
    if (cleanDecision !== "ACCEPTED" && cleanDecision !== "REJECTED") {
      return NextResponse.json(
        { error: "decision must be ACCEPTED or REJECTED" },
        { status: 400 }
      );
    }

    const eventId = `qdec-${Date.now()}-${randomUUID().slice(0, 8)}`;

    const result = await sendMarkaEvent(eventId, "quotation.decision", {
      quotation_id: String(quotationId).trim(),
      decision: cleanDecision,
      ...(reason ? { reason: String(reason).trim() } : {}),
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
    const msg = err instanceof Error ? err.message : "Failed to process quotation decision";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
