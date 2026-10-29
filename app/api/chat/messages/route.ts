import { NextRequest, NextResponse } from "next/server";
import { crmRepo } from "@/lib/repositories/crm";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const threadId = searchParams.get("threadId");

  if (!threadId) {
    return NextResponse.json({ error: "threadId is required" }, { status: 400 });
  }

  try {
    const messages = crmRepo.getChatMessages(threadId);
    return NextResponse.json({ success: true, messages });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to load chat messages";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
