import { NextResponse } from "next/server";
import { getHome, updateHome, type Home } from "@/data/homesStore";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const home = getHome(+params.id);
  if (!home) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(home);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const updates = (await req.json()) as Partial<Home>;
  const updated = updateHome({ ...(updates as Home), id: +params.id });
  return NextResponse.json(updated);
}
