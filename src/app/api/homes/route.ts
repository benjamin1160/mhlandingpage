// src/app/api/homes/route.ts
import { NextResponse } from "next/server";
import { getAllHomes, updateHome } from "@/data/homesStore";

export async function GET() {
  // Return the full list of homes
  return NextResponse.json(getAllHomes());
}

export async function POST(req: Request) {
  // Create or update via POST (body must include id and all fields)
  const home = await req.json();
  const updated = updateHome(home);
  return NextResponse.json(updated);
}
