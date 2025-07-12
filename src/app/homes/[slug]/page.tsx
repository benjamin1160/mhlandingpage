import { notFound } from "next/navigation";
import Image from "next/image";

// Mock homes
const mockHomes = {
  "sunshine-320-xl": {
    name: "Sunshine 320 XL",
    image: "/homes/sunshine-320.png",
    description: "Spacious 3-bed, 2-bath layout.",
  },
  "clayton-everest": {
    name: "Clayton Everest",
    image: "/homes/clayton-everest.png",
    description: "Modern 4-bed with open concept kitchen.",
  },
} satisfies Record<string, { name: string; image: string; description: string }>;

export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  const home = mockHomes[params.slug as keyof typeof mockHomes];
  if (!home) return notFound();

  return (
    <main className="p-10 text-slate-900">
      <h1 className="text-4xl font-bold">{home.name}</h1>
      <p className="mt-4 text-lg">{home.description}</p>
      <div className="mt-6 w-full h-96 relative">
        <Image
          src={home.image}
          alt={home.name}
          fill
          className="object-contain rounded-xl"
        />
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  return Object.keys(mockHomes).map((slug) => ({ slug }));
}
