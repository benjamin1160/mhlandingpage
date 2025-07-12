import { LiveHomePreview } from "@/components/LiveHomePreview";
import { useHomeStore } from "@/state/homeStore";
import { useEffect } from "react";

// Pre-generate IDs 1–1000 for static pages
export async function generateStaticParams() {
  const total = 1000;
  return Array.from({ length: total }, (_, i) => ({
    id: String(i + 1),
  }));
}

interface Props {
  params: { id: string };
}

function PreviewClient({ id }: { id: string }) {
  "use client";

  const setAnswer = useHomeStore((state) => state.setAnswer);

  // Mock seeding for now
  useEffect(() => {
    setAnswer("bedrooms", 3);
    setAnswer("style", "Modern");
    setAnswer("budget", "$100k–$150k");
  }, [id, setAnswer]);

  return (
    <main className="min-h-screen bg-white px-8 py-12">
      <h1 className="mb-6 text-3xl font-bold">Home #{id} Preview</h1>
      <LiveHomePreview />
    </main>
  );
}

export default function HomePage({ params }: Props) {
  return <PreviewClient id={params.id} />;
}
