import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { sendMarkaEvent } from "@/lib/marka-crm";
import { inquiriesRepo } from "@/lib/repositories/inquiries";
import { sendInquiryNotification } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message, targetBudget } = body || {};

    if (!name || !email || !subject) {
      return NextResponse.json(
        { error: "Nama, email, dan subjek wajib diisi" },
        { status: 400 }
      );
    }

    const eventId =
      req.headers.get("idempotency-key") ||
      `inq-${Date.now()}-${randomUUID().slice(0, 8)}`;

    // Save to local inquiries SQLite repository as well
    try {
      inquiriesRepo.create({
        name: String(name).trim(),
        phone: phone ? String(phone).trim() : "",
        email: String(email).trim(),
        contact: phone || email,
        service: subject ? String(subject).trim() : "Contact Us Form",
        packageChoice: subject ? String(subject).trim() : "General Contact",
        billingCycle: "-",
        price: targetBudget ? `Rp ${Number(targetBudget).toLocaleString("id-ID")}` : "-",
        message: message ? String(message).trim() : "",
        brandDescription: message ? String(message).trim() : "",
        source: "contact_form",
      });
    } catch (dbErr) {
      console.warn("Failed to save local inquiry in /api/contact:", dbErr);
    }

    // Send email notification to corporate@adsvar.id using Google SMTP
    try {
      await sendInquiryNotification({
        name: String(name).trim(),
        phone: phone ? String(phone).trim() : "",
        email: String(email).trim(),
        service: subject ? String(subject).trim() : "Contact Us Form",
        packageChoice: subject ? String(subject).trim() : "General Contact",
        billingCycle: "-",
        price: targetBudget ? `Rp ${Number(targetBudget).toLocaleString("id-ID")}` : "-",
        message: message ? String(message).trim() : "",
        brandDescription: message ? String(message).trim() : "",
        source: "contact_form",
      });
    } catch (mailErr) {
      console.warn("Failed to dispatch email notification in /api/contact:", mailErr);
    }

    // Send event to Marka CRM
    const result = await sendMarkaEvent(eventId, "inquiry.submitted", {
      customer: {
        name: String(name).trim().slice(0, 200),
        email: String(email).trim().toLowerCase().slice(0, 320),
        phone: phone ? String(phone).trim().slice(0, 40) : undefined,
      },
      requirements: {
        subject: String(subject).trim().slice(0, 300),
        description: message ? String(message).trim().slice(0, 20000) : "",
        ...(targetBudget ? { target_budget: Number(targetBudget) } : {}),
      },
    });

    return NextResponse.json(
      {
        success: result.success,
        eventId: result.event_id,
        status: result.status,
        markaResponse: result.data || result.error,
      },
      { status: result.success ? 202 : result.status || 500 }
    );
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Gagal memproses formulir kontak";
    console.error("Gagal mengirim inquiry ke Marka:", errMsg);
    return NextResponse.json(
      { error: errMsg },
      { status: 500 }
    );
  }
}
