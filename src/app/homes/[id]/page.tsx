// src/app/homes/[id]/page.tsx
import ClientHomePage from "./ClientHomePage";
import homesData from "@/data/homes.json";
import { notFound } from "next/navigation";

// Generate one static page per entry in homes.json
export async function generateStaticParams() {
  return homesData.map((home) => ({
    id: home.id.toString(),
  }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const home = homesData.find((h) => h.id.toString() === id);
  if (!home) notFound();
  // Cast since homes.json does not currently include all ClientHomePage fields
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
  return <ClientHomePage id={id} homeData={home as any} />;
}
