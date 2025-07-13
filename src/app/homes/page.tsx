// src/app/homes/page.tsx
import Link from "next/link";
import homesData from "@/data/homes.json";

interface Home {
  id: number;
  bedrooms: number;
  style: string;
  budget: string;
}

export default function HomesIndex() {
  const homes = homesData as unknown as Home[];
  return (
    <main className="min-h-screen bg-white px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">All Homes</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {homes.map((home) => (
          <li key={home.id} className="border rounded-lg p-4 hover:shadow-lg">
            <Link href={`/homes/${home.id}`} className="block">
              <h2 className="text-2xl font-semibold mb-2">Home #{home.id}</h2>
              <p>{home.bedrooms} bed • {home.style} • {home.budget}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
