"use client";

import { useEffect } from "react";
import { LiveHomePreview } from "@/components/LiveHomePreview";
import { useHomeStore } from "@/state/homeStore";

interface Props {
  id: string;
  homeData: {
    id: number;
    name: string;
    [key: string]: unknown;
  };
}

export default function ClientHomePage({ id, homeData }: Props) {
  const setAnswer = useHomeStore((state) => state.setAnswer);

  useEffect(() => {
    // Seed placeholder answers (replace with real fetch later)
    setAnswer("bedrooms", 3);
    setAnswer("style", "Modern");
    setAnswer("budget", "$100k–$150k");
  }, [id, setAnswer]);

  return (
    <main className="min-h-screen bg-white px-8 py-12">
      <h1 className="text-3xl font-bold mb-6">{homeData.name}</h1>
      <LiveHomePreview />
    </main>
  );
}
