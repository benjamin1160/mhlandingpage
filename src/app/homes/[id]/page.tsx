// src/app/homes/[id]/page.tsx
import ClientHomePage from "./ClientHomePage";
import homesData from "@/data/homes.json";
import { notFound } from "next/navigation";

// Build pages for IDs 1–5 from homes.json
export async function generateStaticParams() {
  return homesData.map((h) => ({ id: h.id.toString() }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const home = homesData.find((h) => h.id.toString() === id);
  if (!home) notFound();
  return <ClientHomePage id={id} homeData={home} />;
}
