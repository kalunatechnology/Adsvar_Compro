import { NextResponse } from "next/server";
import { servicesRepo } from "@/lib/repositories/services";

export async function GET() {
  try {
    const services = servicesRepo.list();
    return NextResponse.json({ success: true, data: services });
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memuat layanan" },
      { status: 500 }
    );
  }
}
