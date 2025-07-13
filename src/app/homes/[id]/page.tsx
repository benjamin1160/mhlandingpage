// src/app/homes/[id]/page.tsx
import ClientHomePage, { type HomeData } from "./ClientHomePage";
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
  const base = homesData.find((h) => h.id.toString() === id);
  if (!base) notFound();

  const home: HomeData = {
    id: base.id,
    bedrooms: 3,
    style: "Modern",
    budget: "$100k–$150k",
    image: "/home-placeholder.png",
    listings: [
      { title: "Example Listing", price: "$120,000" },
    ],
  };

  return <ClientHomePage id={id} homeData={home} />;
}
