import { NextRequest, NextResponse } from "next/server";
import { inquiriesRepo } from "@/lib/repositories/inquiries";
import { sendInquiryNotification } from "@/lib/email";

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
        { success: false, error: "Name is required" },
        { status: 400 }
      );
    }

    if (!effectiveContact) {
      return NextResponse.json(
        { success: false, error: "WhatsApp number or Email is required" },
        { status: 400 }
      );
    }

    const payload = {
      name: name.trim(),
      phone: (phone || "").trim(),
      email: (email || "").trim(),
      contact: effectiveContact,
      service: (service || packageChoice || "General").trim(),
      packageChoice: (packageChoice || service || "").trim(),
      billingCycle: (billingCycle || "").trim(),
      price: (price || "").trim(),
      message: (message || brandDescription || "").trim(),
      brandDescription: (brandDescription || message || "").trim(),
      source: (source || "book_consultation").trim(),
    };

    let inquiry = null;
    try {
      inquiry = inquiriesRepo.create(payload);
    } catch (dbErr) {
      console.error("[Inquiry] SQLite record error:", dbErr);
    }

    // Send email notification to corporate@adsvar.id using Google SMTP
    try {
      await sendInquiryNotification(payload);
    } catch (mailErr) {
      console.warn("[Inquiry] Failed to dispatch email notification:", mailErr);
    }

    return NextResponse.json({
      success: true,
      data: inquiry || {
        id: Date.now(),
        ...payload,
        status: "pending",
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Failed to process inquiry:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process consultation form" },
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
      { success: false, error: "Failed to load CRM inquiries" },
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
        { success: false, error: "ID and status are required" },
        { status: 400 }
      );
    }

    const success = inquiriesRepo.updateStatus(Number(id), status);
    if (!success) {
      return NextResponse.json(
        { success: false, error: "Inquiry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "CRM status updated" });
  } catch (error) {
    console.error("Failed to update inquiry status:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update inquiry status" },
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
        { success: false, error: "Inquiry ID is required" },
        { status: 400 }
      );
    }

    const success = inquiriesRepo.delete(Number(id));
    return NextResponse.json({ success, message: "CRM inquiry deleted" });
  } catch (error) {
    console.error("Failed to delete inquiry:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete inquiry" },
      { status: 500 }
    );
  }
}
