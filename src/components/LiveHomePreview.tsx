"use client";

import { useHomeStore } from "@/state/homeStore";
import Image from "next/image";

export function LiveHomePreview() {
  const { bedrooms, style, budget } = useHomeStore();
  const totalAnswered = [bedrooms, style, budget].filter(Boolean).length;

  // Calculate visibility (0% → 100%)
  const visibility = totalAnswered / 3; // adjust if you add more questions

  return (
    <div className="relative h-[300px] w-full overflow-hidden rounded-xl bg-slate-800 md:h-[400px]">
      <Image
        src="/home-placeholder.png" // Add this file to /public folder
        alt="Your dream home"
        fill
        className="object-contain transition-all duration-700 ease-in-out"
        style={{
          filter: `blur(${(1 - visibility) * 8}px)`,
          opacity: 0.3 + visibility * 0.7,
        }}
      />
    </div>
  );
}
