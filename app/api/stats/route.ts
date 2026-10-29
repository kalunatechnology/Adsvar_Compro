import { NextResponse } from "next/server";
import { statsRepo } from "@/lib/repositories/stats";

export async function GET() {
  try {
    const stats = statsRepo.list();
    return NextResponse.json({ success: true, data: stats });
  } catch (error) {
    console.error("Failed to fetch company stats:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load statistics" },
      { status: 500 }
    );
  }
}
