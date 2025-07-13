// src/app/homes/[id]/page.tsx
import ClientHomePage from "./ClientHomePage";
import { notFound } from "next/navigation";

// Pre-generate IDs 1–200 for static pages
export async function generateStaticParams() {
  return Array.from({ length: 200 }, (_, i) => ({ id: String(i + 1) }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Fetch the real home data from your API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/homes/${id}`,
    { cache: "no-store" }
  );
  if (!res.ok) notFound();
  const homeData = await res.json();

  return <ClientHomePage id={id} homeData={homeData} />;
}
