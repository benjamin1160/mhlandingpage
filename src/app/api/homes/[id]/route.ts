// src/app/api/homes/[id]/route.ts
import { NextResponse } from "next/server";
import { getHome, updateHome, type Home } from "@/data/homesStore";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const home = getHome(Number(id));
  if (!home) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(home);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = (await req.json()) as unknown;
  const updates = body as Home;
  const updated = updateHome({ ...updates, id: Number(id) });
  return NextResponse.json(updated);
}
