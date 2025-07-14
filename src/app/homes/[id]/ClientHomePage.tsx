"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LiveHomePreview } from "@/components/LiveHomePreview";
import { useHomeStore } from "@/state/homeStore";

interface HomeData {
  id: number;
  bedrooms: number;
  style: string;
  budget: string;
  image: string;
  listings: { title: string; price: string }[];
}

interface Props {
  id: string;
  homeData: HomeData;
}

export default function ClientHomePage({ id, homeData }: Props) {
  const router = useRouter();
  const setAnswer = useHomeStore((s) => s.setAnswer);

  // Local state for edit form
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<HomeData>(homeData);
  const [saving, setSaving] = useState(false);

  // Seed Zustand for the preview
  useEffect(() => {
    setAnswer("bedrooms", form.bedrooms);
    setAnswer("style", form.style);
    setAnswer("budget", form.budget);
  }, [form, setAnswer]);

  // Handle input changes
  const onChange = <K extends keyof HomeData>(key: K, value: HomeData[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  // Save back to API and refresh
  const onSave = async () => {
    setSaving(true);
    await fetch(`/api/homes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setEditMode(false);
    // Tell Next.js to reload server data
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-white px-8 py-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Home #{id} Preview</h1>
        <button
          onClick={() => setEditMode((m) => !m)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {editMode ? "Cancel" : "Edit"}
        </button>
      </div>

      {editMode ? (
        <div className="space-y-4 max-w-md">
          <label className="block">
            Bedrooms:
            <input
              type="number"
              value={form.bedrooms}
              onChange={(e) => onChange("bedrooms", +e.target.value)}
              className="mt-1 w-full p-2 border rounded"
            />
          </label>
          <label className="block">
            Style:
            <input
              type="text"
              value={form.style}
              onChange={(e) => onChange("style", e.target.value)}
              className="mt-1 w-full p-2 border rounded"
            />
          </label>
          <label className="block">
            Budget:
            <input
              type="text"
              value={form.budget}
              onChange={(e) => onChange("budget", e.target.value)}
              className="mt-1 w-full p-2 border rounded"
            />
          </label>
          <label className="block">
            Image URL:
            <input
              type="text"
              value={form.image}
              onChange={(e) => onChange("image", e.target.value)}
              className="mt-1 w-full p-2 border rounded"
            />
          </label>
          {/* For simplicity, edit listings as JSON */}
          <label className="block">
            Listings (JSON):
            <textarea
              rows={4}
              value={JSON.stringify(form.listings, null, 2)}
              onChange={(e) => {
                try {
                  onChange(
                    "listings",
                    JSON.parse(e.target.value) as { title: string; price: string }[]
                  );
                } catch {
                  // ignore parse errors
                }
              }}
              className="mt-1 w-full p-2 border rounded font-mono text-sm"
            />
          </label>
          <button
            onClick={onSave}
            disabled={saving}
            className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      ) : (
        <>
          <img
            src={form.image}
            alt={`Home ${id}`}
            className="mb-6 w-full max-w-md rounded"
          />
          <LiveHomePreview />
          <section className="mt-8 space-y-2">
            <p>
              <strong>Bedrooms:</strong> {form.bedrooms}
            </p>
            <p>
              <strong>Style:</strong> {form.style}
            </p>
            <p>
              <strong>Budget:</strong> {form.budget}
            </p>
            <div>
              <strong>Listings:</strong>
              <ul className="list-disc list-inside ml-4">
                {form.listings.map((l, i) => (
                  <li key={i}>
                    {l.title}: {l.price}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
