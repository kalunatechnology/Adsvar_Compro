import { NextRequest, NextResponse } from "next/server";
import { inquiriesRepo } from "@/lib/repositories/inquiries";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, contact, service, message } = body;

    if (!name || !contact) {
      return NextResponse.json(
        { success: false, error: "Nama dan kontak wajib diisi" },
        { status: 400 }
      );
    }

    const inquiry = inquiriesRepo.create({
      name,
      contact,
      service: service || "Umum",
      message: message || "",
    });

    return NextResponse.json({ success: true, data: inquiry });
  } catch (error) {
    console.error("Failed to record inquiry:", error);
    return NextResponse.json(
      { success: false, error: "Gagal menyimpan pesan konsultasi" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const inquiries = inquiriesRepo.list();
    return NextResponse.json({ success: true, data: inquiries });
  } catch (error) {
    console.error("Failed to fetch inquiries:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memuat konsultasi" },
      { status: 500 }
    );
  }
}
