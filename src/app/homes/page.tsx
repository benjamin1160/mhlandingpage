"use client";

import { useEffect, useState } from "react";
import type { Home } from "@/data/homesStore";

export default function HomesIndex() {
  const [homes, setHomes] = useState<Home[]>([]);
  const [loading, setLoading] = useState(true);

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
    value: string | number,
  ) => {
    setHomes((hs) =>
      hs.map((h) =>
        h.id === id
          ? ({
              ...h,
              [field]: value,
            } as Home)
          : h,
      ),
    );
  };

  const save = async (home: Home) => {
    const res = await fetch(`/api/homes/${home.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(home),
    });
    const updated = (await res.json()) as Home;
    // Update local state so the UI reflects the change immediately
    setHomes((hs) => hs.map((h) => (h.id === updated.id ? updated : h)));
  };

  if (loading) return <p className="p-8">Loading homes…</p>;

  return (
    <main className="min-h-screen bg-white px-8 py-12">
      <h1 className="mb-8 text-4xl font-bold">Editable Homes Admin</h1>
      <ul className="space-y-6">
        {homes.map((h) => (
          <li key={h.id} className="rounded-lg border p-6">
            <h2 className="mb-4 text-2xl font-semibold">Home #{h.id}</h2>

            <label className="mb-2 block">
              Bedrooms:
              <input
                type="number"
                value={h.bedrooms}
                onChange={(e) =>
                  handleChange(h.id, "bedrooms", Number(e.target.value))
                }
                className="ml-2 w-20 rounded border p-1"
              />
            </label>

            <label className="mb-2 block">
              Style:
              <input
                type="text"
                value={h.style}
                onChange={(e) => handleChange(h.id, "style", e.target.value)}
                className="ml-2 rounded border p-1"
              />
            </label>

            <label className="mb-2 block">
              Budget:
              <input
                type="text"
                value={h.budget}
                onChange={(e) => handleChange(h.id, "budget", e.target.value)}
                className="ml-2 rounded border p-1"
              />
            </label>

            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => save(h)}
                className="rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
              >
                Save
              </button>
              <a
                href={`/homes/${h.id}`}
                className="rounded border px-4 py-2 hover:bg-gray-50"
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
