// src/app/homes/[id]/page.tsx
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ClientHomePage from "./ClientHomePage";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

const db = new PrismaClient();

// Pre-generate pages for all homes in your database
export async function generateStaticParams() {
  const homes = await db.home.findMany({ select: { id: true } });
  return homes.map((h: any) => ({ id: String(h.id) }));
}

// Always fetch fresh data on each request
export const dynamic = "force-dynamic";

export default async function HomePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const home = await db.home.findUnique({
    where: { id: Number(id) },
    include: { listings: true },
  });
  if (!home) return notFound();
  return <ClientHomePage id={id} homeData={home} />;
}
