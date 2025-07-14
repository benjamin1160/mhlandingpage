// src/app/homes/[id]/page.tsx
import ClientHomePage from "./ClientHomePage";
import { getHome } from "@/data/homesStore";
import { notFound } from "next/navigation";

export default function HomePage({ params }: { params: { id: string } }) {
  const home = getHome(+params.id);
  if (!home) notFound();
  return <ClientHomePage id={params.id} homeData={home} />;
}
