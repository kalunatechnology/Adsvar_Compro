import { NextRequest, NextResponse } from "next/server";
import { projectsRepo } from "@/lib/repositories/projects";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const projects = projectsRepo.list(category);
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    if (error && typeof error === "object" && "digest" in error) {
      throw error;
    }
    console.error("Failed to fetch projects:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load projects" },
      { status: 500 }
    );
  }
}
