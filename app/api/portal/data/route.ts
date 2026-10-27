import { NextRequest, NextResponse } from "next/server";
import { fetchMarkaPortalData } from "@/lib/marka-crm";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") as "quotations" | "tickets" | null;
  const id = searchParams.get("id");
  const token = searchParams.get("token");

  if (!type || !id || !token) {
    return NextResponse.json(
      { error: "Parameter type (quotations/tickets), id, dan token wajib disertakan" },
      { status: 400 }
    );
  }

  if (type !== "quotations" && type !== "tickets") {
    return NextResponse.json(
      { error: "Parameter type harus 'quotations' atau 'tickets'" },
      { status: 400 }
    );
  }

  try {
    const result = await fetchMarkaPortalData(type, id, token);
    return NextResponse.json(result, { status: result.status || 200 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Gagal membaca data portal Marka";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
