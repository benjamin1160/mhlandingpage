// src/app/homes/[id]/head.tsx
import type { Metadata } from "next";

export default function Head({ params }: { params: { id: string } }): Metadata {
  return {
    title: `Dream Home #${params.id}`,
    description: `Customize and preview your manufactured home #${params.id}.`,
  };
}
