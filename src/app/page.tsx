"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { QuizEngine } from "@/components/QuizEngine";
import { LiveHomePreview } from "@/components/LiveHomePreview";

const images = [
  "/clayton-everest.png",
  "/sunshine-320.png",
  "/home-placeholder.png",
];

function HeroCarousel() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIdx((i) => (i + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-64 md:h-96 relative overflow-hidden">
      <Image
        src={images[idx]!}
        alt={`Slide ${idx + 1}`}
        fill
        className="object-cover"
      />
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <main className="min-h-screen bg-slate-900 text-white px-4 py-10 flex flex-col md:flex-row gap-8">
        {/* Left: Quiz */}
        <div className="w-full md:w-1/2 max-w-lg">
          <QuizEngine />
        </div>
        {/* Right: Evolving Home Preview */}
        <div className="w-full md:w-1/2">
          <LiveHomePreview />
        </div>
      </main>
    </>
  );
}
