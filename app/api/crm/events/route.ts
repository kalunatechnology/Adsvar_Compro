import { NextRequest, NextResponse } from "next/server";
import { crmRepo } from "@/lib/repositories/crm";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get("limit")) || 100;
    const logs = crmRepo.getEventLogs(limit);
    return NextResponse.json({ success: true, logs });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to load event logs";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    crmRepo.clearEventLogs();
    return NextResponse.json({ success: true, message: "Event logs cleared successfully" });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to clear logs";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
