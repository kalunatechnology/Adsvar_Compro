import { NextRequest, NextResponse } from "next/server";
import { crmRepo } from "@/lib/repositories/crm";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get("limit")) || 100;
    const logs = crmRepo.getEventLogs(limit);
    return NextResponse.json({ success: true, logs });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Gagal memuat log events";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    crmRepo.clearEventLogs();
    return NextResponse.json({ success: true, message: "Log events berhasil dibersihkan" });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Gagal membersihkan log";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
