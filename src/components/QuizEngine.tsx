"use client";

import { useState } from "react";
import { useHomeStore } from "@/state/homeStore";
import { useRouter } from "next/navigation";
import ContactFormModal from "./ContactFormModal";

const questions: {
  key: "bedrooms" | "style" | "budget";
  label: string;
  options: Array<string | number>;
}[] = [
  {
    key: "bedrooms",
    label: "How many bedrooms do you want?",
    options: [2, 3, 4],
  },
  {
    key: "style",
    label: "Which style do you prefer?",
    options: ["Modern", "Farmhouse", "Traditional"],
  },
  {
    key: "budget",
    label: "What’s your budget range?",
    options: ["Under $100k", "$100k–$150k", "$150k+"],
  },
];

export function QuizEngine() {
  const [step, setStep] = useState(0);
  const setAnswer = useHomeStore((state) => state.setAnswer);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const router = useRouter();

  const current = questions[step];

  const handleSelect = (value: string | number) => {
    if (!current) return;
    setAnswer(current.key, value);
    setStep((prev) => prev + 1);
  };

  if (!current) {
    // Quiz complete → show contact form
    return (
      <>
        <ContactFormModal
          data={formData}
          onChange={(key, value) =>
            setFormData((d) => ({ ...d, [key]: value }))
          }
          onSubmit={async () => {
            const { bedrooms, style, budget } = useHomeStore.getState();
            try {
              const res = await fetch("/api/map-home", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ bedrooms, style, budget }),
              });
              if (res.ok) {
                const { homeId } = (await res.json()) as { homeId: number };
                router.push(`/homes/${homeId}`);
              } else {
                console.error(await res.text());
              }
            } catch (err) {
              console.error(err);
            }
          }}
          onClose={() => setShowForm(false)}
        />
      </>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">{current.label}</h2>
        <div className="flex flex-wrap gap-4">
          {current.options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className="rounded-lg bg-white px-6 py-3 text-lg text-slate-900 transition-all hover:bg-emerald-100"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      {showForm && (
        <ContactFormModal
          data={formData}
          onChange={(key, value) =>
            setFormData((d) => ({ ...d, [key]: value }))
          }
          onSubmit={async () => {
            const { bedrooms, style, budget } = useHomeStore.getState();
            try {
              const res = await fetch("/api/map-home", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ bedrooms, style, budget }),
              });
              if (res.ok) {
                const { homeId } = (await res.json()) as { homeId: number };
                router.push(`/homes/${homeId}`);
              } else {
                console.error(await res.text());
              }
            } catch (err) {
              console.error(err);
            }
          }}
          onClose={() => setShowForm(false)}
        />
      )}
    </>
  );
}
