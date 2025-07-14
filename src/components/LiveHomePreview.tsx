// src/components/LiveHomePreview.tsx
"use client";

import Image from "next/image";
import { useHomeStore } from "@/state/homeStore";

export function LiveHomePreview() {
  const { bedrooms, style, budget } = useHomeStore();
  const totalAnswered = [bedrooms, style, budget].filter(Boolean).length;
  const visibility = totalAnswered / 3; // 0 → 1

  return (
    <div className="relative h-[300px] w-full overflow-hidden rounded-xl bg-slate-800 md:h-[400px]">
      <Image
        src="/home-placeholder.png"
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
