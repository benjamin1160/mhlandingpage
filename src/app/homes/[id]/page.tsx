// src/app/homes/[id]/page.tsx
import ClientHomePage from "./ClientHomePage";
import { getHome } from "@/data/homesStore";
import { notFound } from "next/navigation";

// Force Next.js to skip cache and re-run this on every request
export const dynamic = "force-dynamic";

export default async function HomePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const home = getHome(Number(id));
  if (!home) return notFound();
  return <ClientHomePage id={id} homeData={home} />;
}
