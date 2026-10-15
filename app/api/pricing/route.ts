import { NextResponse } from "next/server";
import { pricingRepo } from "@/lib/repositories/pricing";

export async function GET() {
  try {
    const plans = pricingRepo.list();
    return NextResponse.json({ success: true, data: plans });
  } catch (error) {
    console.error("Failed to fetch pricing plans:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memuat paket harga" },
      { status: 500 }
    );
  }
}
