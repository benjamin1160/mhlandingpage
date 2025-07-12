import { notFound } from "next/navigation";
import Image from "next/image";

const mockHomes = {
  "sunshine-320-xl": {
    name: "Sunshine 320 XL",
    image: "/homes/sunshine-320.png",
    description: "A spacious double-wide home with 3 bedrooms, 2 bathrooms, and modern finishes.",
  },
  "clayton-everest": {
    name: "Clayton Everest",
    image: "/homes/clayton-everest.png",
    description: "A stylish 4-bedroom layout with an open-concept kitchen and flex room.",
  },
};

// Tell Next.js which slugs to pre-render
export async function generateStaticParams() {
  return Object.keys(mockHomes).map((slug) => ({ slug }));
}

// Now match the full PageProps signature (params + searchParams)
export default function HomePage({
  params,
  searchParams, // required by Next’s PageProps, even if unused
}: {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const home = mockHomes[params.slug as keyof typeof mockHomes];
  if (!home) return notFound();

  return (
    <main className="min-h-screen bg-white text-slate-900 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold">{home.name}</h1>
        <p className="mt-4 text-lg text-slate-600">{home.description}</p>
        <div className="mt-8 w-full h-[400px] relative">
          <Image
            src={home.image}
            alt={home.name}
            fill
            className="object-contain rounded-xl shadow-xl"
          />
        </div>
      </div>
    </main>
  );
}
