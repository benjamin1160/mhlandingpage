import { NextResponse } from "next/server";
import { getAllHomes, updateHome, type Home } from "@/data/homesStore";

export async function GET() {
  return NextResponse.json(getAllHomes());
}

export async function POST(req: Request) {
  const newHome = (await req.json()) as Home;
  updateHome(newHome);
  return NextResponse.json(newHome);
}
