// src/app/homes/[id]/ClientHomePage.tsx
"use client";

import { useEffect } from "react";
import { LiveHomePreview } from "@/components/LiveHomePreview";
import { useHomeStore } from "@/state/homeStore";

interface Props {
  id: string;
}

export default function ClientHomePage({ id }: Props) {
  const setAnswer = useHomeStore((state) => state.setAnswer);

  useEffect(() => {
    // Seed with placeholder values (replace with real fetch later)
    setAnswer("bedrooms", 3);
    setAnswer("style", "Modern");
    setAnswer("budget", "$100k–$150k");
  }, [id, setAnswer]);

  return (
    <main className="min-h-screen bg-white px-8 py-12">
      <h1 className="text-3xl font-bold mb-6">Home #{id} Preview</h1>
      <LiveHomePreview />
    </main>
  );
}
