import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { sendMarkaEvent } from "@/lib/marka-crm";
import { crmRepo } from "@/lib/repositories/crm";

export async function POST(req: NextRequest) {
  try {
    const { subject, description, serialNumber, customerEmail } = await req.json();

    if (!subject || !description) {
      return NextResponse.json(
        { error: "Subjek dan deskripsi keluhan wajib diisi" },
        { status: 400 }
      );
    }

    const eventId = `tkt-${Date.now()}-${randomUUID().slice(0, 8)}`;

    // Save locally
    try {
      crmRepo.saveTicket({
        eventId,
        subject: String(subject).trim(),
        description: String(description).trim(),
        serialNumber: serialNumber ? String(serialNumber).trim() : undefined,
        customerEmail: customerEmail ? String(customerEmail).trim() : undefined,
      });
    } catch (dbErr) {
      console.warn("Failed to save local ticket:", dbErr);
    }

    // Send event to Marka CRM
    const result = await sendMarkaEvent(eventId, "ticket.created", {
      subject: String(subject).trim(),
      description: String(description).trim(),
      ...(serialNumber ? { serial_number: String(serialNumber).trim() } : {}),
      ...(customerEmail ? { customer_email: String(customerEmail).trim() } : {}),
    });

    return NextResponse.json(
      {
        success: result.success,
        eventId,
        status: result.status,
        message: result.success
          ? "Tiket berhasil dibuat di CRM Marka"
          : "Gagal membuat tiket di CRM Marka",
        markaResponse: result.data || result.error,
      },
      { status: result.success ? 202 : result.status || 500 }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Gagal memproses tiket";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function GET() {
  try {
    const tickets = crmRepo.getTickets();
    return NextResponse.json({ success: true, tickets });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Gagal memuat tiket";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
