import { NextResponse } from "next/server";
import { getHome, updateHome, type Home } from "@/data/homesStore";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const home = getHome(+id);
  if (!home) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(home);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const updates = (await req.json()) as Partial<Home>;
  const updated = updateHome({ ...(updates as Home), id: +id });
  return NextResponse.json(updated);
}
