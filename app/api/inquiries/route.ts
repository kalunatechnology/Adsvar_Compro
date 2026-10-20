import { NextRequest, NextResponse } from "next/server";
import { inquiriesRepo } from "@/lib/repositories/inquiries";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      phone,
      email,
      contact,
      service,
      packageChoice,
      billingCycle,
      price,
      message,
      brandDescription,
      source,
    } = body;

    const effectiveContact = (contact || phone || email || "").trim();

    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Nama wajib diisi" },
        { status: 400 }
      );
    }

    if (!effectiveContact) {
      return NextResponse.json(
        { success: false, error: "Nomor WhatsApp atau Email wajib diisi" },
        { status: 400 }
      );
    }

    const inquiry = inquiriesRepo.create({
      name: name.trim(),
      phone: (phone || "").trim(),
      email: (email || "").trim(),
      contact: effectiveContact,
      service: (service || packageChoice || "Umum").trim(),
      packageChoice: (packageChoice || service || "").trim(),
      billingCycle: (billingCycle || "").trim(),
      price: (price || "").trim(),
      message: (message || brandDescription || "").trim(),
      brandDescription: (brandDescription || message || "").trim(),
      source: (source || "book_consultation").trim(),
    });

    return NextResponse.json({ success: true, data: inquiry });
  } catch (error) {
    console.error("Failed to record inquiry:", error);
    return NextResponse.json(
      { success: false, error: "Gagal menyimpan data ke sistem CRM" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || undefined;
    const source = searchParams.get("source") || undefined;

    const inquiries = inquiriesRepo.list({ status, source });
    return NextResponse.json({ success: true, data: inquiries });
  } catch (error) {
    console.error("Failed to fetch inquiries:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memuat data konsultasi CRM" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "ID dan status wajib disertakan" },
        { status: 400 }
      );
    }

    const success = inquiriesRepo.updateStatus(Number(id), status);
    if (!success) {
      return NextResponse.json(
        { success: false, error: "Data inquiry tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Status CRM diperbarui" });
  } catch (error) {
    console.error("Failed to update inquiry status:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memperbarui status inquiry" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID inquiry wajib disertakan" },
        { status: 400 }
      );
    }

    const success = inquiriesRepo.delete(Number(id));
    return NextResponse.json({ success, message: "Data inquiry CRM dihapus" });
  } catch (error) {
    console.error("Failed to delete inquiry:", error);
    return NextResponse.json(
      { success: false, error: "Gagal menghapus data inquiry" },
      { status: 500 }
    );
  }
}
