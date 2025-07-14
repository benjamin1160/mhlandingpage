// src/app/api/homes/[id]/route.ts
import { NextResponse } from "next/server";
import { getHome, updateHome } from "@/data/homesStore";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const home = getHome(Number(params.id));
  if (!home) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(home);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const updates = await req.json();
  const updated = updateHome({ ...updates, id: Number(params.id) });
  return NextResponse.json(updated);
}
