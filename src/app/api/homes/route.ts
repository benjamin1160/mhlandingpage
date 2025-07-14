// src/app/api/homes/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || 1);
  const perPage = Number(searchParams.get("perPage") || 10);
  const homes = await db.home.findMany({
    skip: (page - 1) * perPage,
    take: perPage,
    include: { listings: true },
  });
  return NextResponse.json(homes);
}

export async function POST(req: Request) {
  const data = await req.json();
  const updated = await db.home.update({
    where: { id: data.id },
    data: {
      bedrooms: data.bedrooms,
      style: data.style,
      budget: data.budget,
      image: data.image,
      listings: {
        deleteMany: { homeId: data.id },
        createMany: { data: data.listings },
      },
    },
    include: { listings: true },
  });
  return NextResponse.json(updated);
}
