// src/app/api/homes/[id]/route.ts
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NextResponse, type NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const home = await db.home.findUnique({
    where: { id: Number(params.id) },
    include: { listings: true },
  });
  if (!home) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(home);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const data = await req.json();
  const updated = await db.home.update({
    where: { id: Number(params.id) },
    data: {
      bedrooms: data.bedrooms,
      style: data.style,
      budget: data.budget,
      image: data.image,
      listings: {
        deleteMany: { homeId: Number(params.id) },
        createMany: { data: data.listings },
      },
    },
    include: { listings: true },
  });
  return NextResponse.json(updated);
}
