"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Home } from "@/data/homesStore";

export default function HomesIndex() {
  const [homes, setHomes] = useState<Home[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/homes");
      const data = (await res.json()) as unknown as Home[];
      setHomes(data);
      setLoading(false);
    })();
  }, []);

  const handleChange = (
    id: number,
    field: keyof Home,
    value: string | number
  ) => {
    setHomes((hs) =>
      hs.map((h) =>
        h.id === id
          ? {
              ...h,
              [field]: value,
            } as Home
          : h
      )
    );
  };

  const save = async (home: Home) => {
    await fetch(`/api/homes/${home.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(home),
    });
    // Re-fetch the full list so this page reflects server updates
    const res = await fetch("/api/homes", { cache: "no-store" });
    setHomes((await res.json()) as Home[]);
    router.refresh();
  };

  if (loading) return <p className="p-8">Loading homes…</p>;

  return (
    <main className="min-h-screen bg-white px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Editable Homes Admin</h1>
      <ul className="space-y-6">
        {homes.map((h) => (
          <li key={h.id} className="border p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Home #{h.id}</h2>

            <label className="block mb-2">
              Bedrooms:
              <input
                type="number"
                value={h.bedrooms}
                onChange={(e) =>
                  handleChange(h.id, "bedrooms", Number(e.target.value))
                }
                className="ml-2 p-1 border rounded w-20"
              />
            </label>

            <label className="block mb-2">
              Style:
              <input
                type="text"
                value={h.style}
                onChange={(e) =>
                  handleChange(h.id, "style", e.target.value)
                }
                className="ml-2 p-1 border rounded"
              />
            </label>

            <label className="block mb-2">
              Budget:
              <input
                type="text"
                value={h.budget}
                onChange={(e) =>
                  handleChange(h.id, "budget", e.target.value)
                }
                className="ml-2 p-1 border rounded"
              />
            </label>

            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => save(h)}
                className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
              >
                Save
              </button>
              <a
                href={`/homes/${h.id}`}
                className="px-4 py-2 border rounded hover:bg-gray-50"
              >
                View
              </a>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
