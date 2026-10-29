import { NextRequest, NextResponse } from "next/server";
import { fetchMarkaPortalData } from "@/lib/marka-crm";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") as "quotations" | "tickets" | null;
  const id = searchParams.get("id");
  const token = searchParams.get("token");

  if (!type || !id || !token) {
    return NextResponse.json(
      { error: "Parameters type (quotations/tickets), id, and token are required" },
      { status: 400 }
    );
  }

  if (type !== "quotations" && type !== "tickets") {
    return NextResponse.json(
      { error: "Parameter type must be 'quotations' or 'tickets'" },
      { status: 400 }
    );
  }

  try {
    const result = await fetchMarkaPortalData(type, id, token);
    return NextResponse.json(result, { status: result.status || 200 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to load Marka portal data";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
