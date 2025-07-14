// src/app/homes/[id]/page.tsx
import ClientHomePage from "./ClientHomePage";
import { getHome } from "@/data/homesStore";
import { notFound } from "next/navigation";

export default async function HomePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const home = getHome(+id);
  if (!home) notFound();
  return <ClientHomePage id={id} homeData={home} />;
}
