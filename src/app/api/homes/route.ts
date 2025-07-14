// src/app/api/homes/route.ts
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NextResponse, type NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") ?? 1);
  const perPage = Number(searchParams.get("perPage") ?? 10);
  const homes = await db.home.findMany({
    skip: (page - 1) * perPage,
    take: perPage,
    include: { listings: true },
  });
  return NextResponse.json(homes);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const created = await db.home.create({
    data: {
      name: data.name,
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      style: data.style,
      budget: data.budget,
      image: data.image,
      listings: { createMany: { data: data.listings } },
    },
    include: { listings: true },
  });
  return NextResponse.json(created);
}
