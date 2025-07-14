import { NextResponse } from "next/server";
import mapping from "@/data/homeMapping.json";

export async function POST(req: Request) {
  const { bedrooms, style, budget } = (await req.json()) as {
    bedrooms: number;
    style: string;
    budget: string;
  };
  const key = `${bedrooms}-${style}-${budget}`;
  const entry = mapping.find((e) => e.key === key);
  if (!entry) {
    return NextResponse.json(
      { error: "No mapping for " + key },
      { status: 404 },
    );
  }
  return NextResponse.json({ homeId: entry.homeId });
}
