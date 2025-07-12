import Image from "next/image";
import { notFound } from "next/navigation";

const mockHomes = {
  "sunshine-320-xl": {
    name: "Sunshine 320 XL",
    description:
      "Spacious design with modern amenities for comfortable living.",
    image: "/sunshine-320.png",
  },
  "clayton-everest": {
    name: "Clayton Everest",
    description: "Elegant style with plenty of room for the whole family.",
    image: "/clayton-everest.png",
  },
} as const;

type Props = {
  params: { slug: string };
};

export default function HomePage({ params }: Props) {
  const home = mockHomes[params.slug as keyof typeof mockHomes];

  if (!home) return notFound();

  return (
    <main className="mx-auto max-w-3xl space-y-4 p-4 text-white">
      <h1 className="text-3xl font-bold">{home.name}</h1>
      <p>{home.description}</p>
      <div className="relative h-64 w-full">
        <Image
          src={home.image}
          alt={home.name}
          fill
          className="object-contain"
        />
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return Object.keys(mockHomes).map((slug) => ({ slug }));
}
