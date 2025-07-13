"use client";

import { useEffect } from "react";
import { LiveHomePreview } from "@/components/LiveHomePreview";
import { useHomeStore } from "@/state/homeStore";

interface Props {
  id: string;
  homeData: {
    id: number;
    bedrooms: number;
    style: string;
    budget: string;
    image: string;
    listings: { title: string; price: string }[];
  };
}

export default function ClientHomePage({ id, homeData }: Props) {
  const setAnswer = useHomeStore((s) => s.setAnswer);

  useEffect(() => {
    // Seed global state with this home’s data
    setAnswer("bedrooms", homeData.bedrooms);
    setAnswer("style", homeData.style);
    setAnswer("budget", homeData.budget);
  }, [id, homeData, setAnswer]);

  return (
    <main className="min-h-screen bg-white px-8 py-12">
      <h1 className="mb-4 text-3xl font-bold">Home #{id} Preview</h1>

      {/* Display selected home image */}
      <img
        src={homeData.image}
        alt={`Home ${id}`}
        className="mb-6 w-full max-w-md rounded"
      />

      {/* Evolving preview based on quiz state */}
      <LiveHomePreview />

      {/* Listings section */}
      <section className="mt-8">
        <h2 className="mb-4 text-2xl">Available Listings</h2>
        <ul className="list-inside list-disc">
          {homeData.listings.map((listing, idx) => (
            <li key={idx}>
              <strong>{listing.title}</strong>: {listing.price}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
