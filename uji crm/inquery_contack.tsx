// app/api/contact/route.ts (Next.js App Router, server-side)
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { sendMarkaEvent } from "@/lib/marka-crm";

export async function POST(request: NextRequest) {
  const form = await request.json();
  // Validasi input, rate limit dan CAPTCHA dilakukan sebelum meneruskan ke CRM.
  if (!form.name || !form.email || !form.subject) {
    return NextResponse.json({ error: "Data wajib belum lengkap" }, { status: 400 });
  }

  // Production: browser mengirim Idempotency-Key yang dibuat saat form pertama kali
  // disubmit. Website menyimpan key + payload di database/outbox dan memakai ulang
  // keduanya saat retry; jangan membuat randomUUID baru untuk retry submission yang sama.
  const eventId = request.headers.get("idempotency-key") || randomUUID();
  const result = await sendMarkaEvent(eventId, "inquiry.submitted", {
    // Hostname ditentukan konfigurasi server dan harus ada di allowlist source Marka.
    origin_domain: process.env.PUBLIC_ORIGIN_DOMAIN,
    customer: {
      name: String(form.name).slice(0, 200),
      email: String(form.email).slice(0, 320),
      phone: form.phone ? String(form.phone).slice(0, 40) : undefined,
    },
    requirements: {
      subject: String(form.subject).slice(0, 300),
      description: String(form.message || "").slice(0, 20000),
      ...(form.targetBudget ? { target_budget: Number(form.targetBudget) } : {}),
    },
  });

  return NextResponse.json({ accepted: true, event_id: result.event_id }, { status: 202 });
}

// Browser hanya POST ke /api/contact milik website sendiri.
// Browser tidak pernah menerima signing secret atau memanggil endpoint Marka.
// Di production, persist eventId/payload di outbox dan kirim asynchronous agar
// outage Marka tidak membuat lead Contact Us hilang.