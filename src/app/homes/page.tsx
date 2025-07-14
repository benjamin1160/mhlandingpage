// src/app/homes/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Listing {
  title: string;
  price: string;
}
interface Home {
  id: number;
  bedrooms: number;
  style: string;
  budget: string;
  image: string;
  listings: Listing[];
}

export default function HomesIndex() {
  const [homes, setHomes] = useState<Home[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const perPage = 20;

  useEffect(() => {
    setLoading(true);
    void fetch(`/api/homes?page=${page}&perPage=${perPage}`)
      .then((r) => r.json() as Promise<Home[]>)
      .then((data) => {
        setHomes(data);
        setLoading(false);
      });
  }, [page]);

  return (
    <main className="min-h-screen bg-white px-8 py-12">
      <h1 className="mb-6 text-4xl font-bold">Homes (Page {page})</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {homes.map((home) => (
            <li key={home.id} className="rounded-lg border p-4 hover:shadow-lg">
              <Link href={`/homes/${home.id}`}>
                <h2 className="mb-2 text-2xl font-semibold">Home #{home.id}</h2>
                <p>
                  {home.bedrooms} bed • {home.style} • {home.budget}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8 flex justify-between">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="rounded bg-slate-200 px-4 py-2 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="rounded bg-slate-200 px-4 py-2"
        >
          Next
        </button>
      </div>
    </main>
  );
}
