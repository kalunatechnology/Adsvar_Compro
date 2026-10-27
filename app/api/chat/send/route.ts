import { NextRequest, NextResponse } from "next/server";
import { sendMarkaEvent } from "@/lib/marka-crm";
import { crmRepo } from "@/lib/repositories/crm";

export async function POST(req: NextRequest) {
  try {
    const { visitorId, visitorName, messageId, messageText } = await req.json();

    if (!visitorId || !messageText) {
      return NextResponse.json(
        { error: "visitorId dan messageText wajib diisi" },
        { status: 400 }
      );
    }

    const cleanVisitorId = String(visitorId).trim();
    const threadId = `webchat:${cleanVisitorId}`;
    const cleanMsgId = messageId ? String(messageId) : `m-${Date.now()}`;
    const eventId = `msg-${cleanMsgId}`;

    // Store in local chat history
    try {
      crmRepo.saveChatMessage({
        threadId,
        messageId: cleanMsgId,
        senderType: "EXTERNAL",
        senderName: visitorName || "Pengunjung Website",
        text: String(messageText).trim(),
      });
    } catch (dbErr) {
      console.warn("Failed to save local chat message:", dbErr);
    }

    // Send event to Marka CRM
    const result = await sendMarkaEvent(eventId, "message.received", {
      thread_id: threadId,
      message_id: cleanMsgId,
      sender: {
        type: "EXTERNAL",
        value: cleanVisitorId,
        display_name: visitorName || "Pengunjung Website",
      },
      message: {
        type: "TEXT",
        text: String(messageText).trim(),
      },
    });

    return NextResponse.json(
      {
        success: result.success,
        threadId,
        messageId: cleanMsgId,
        status: result.status,
        markaResponse: result.data || result.error,
      },
      { status: result.success ? 202 : result.status || 500 }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Gagal mengirim chat ke Marka CRM";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
