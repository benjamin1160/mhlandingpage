// src/app/api/homes/[id]/route.ts
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NextResponse, type NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const home = await db.home.findUnique({
    where: { id: Number(id) },
    include: { listings: true },
  });
  if (!home) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(home);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const data = await req.json();
  const updated = await db.home.update({
    where: { id: Number(id) },
    data: {
      name: data.name,
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      style: data.style,
      budget: data.budget,
      image: data.image,
      listings: {
        deleteMany: { homeId: Number(id) },
        createMany: { data: data.listings },
      },
    },
    include: { listings: true },
  });
  return NextResponse.json(updated);
}
