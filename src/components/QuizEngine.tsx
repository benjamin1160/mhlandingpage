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
          onSubmit={() => {
            // TODO: replace '1' with the correct home ID generated from answers
            router.push(`/homes/1`);
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
              className="bg-white text-slate-900 rounded-lg px-6 py-3 text-lg hover:bg-emerald-100 transition-all"
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
          onSubmit={() => router.push(`/homes/1`)}
          onClose={() => setShowForm(false)}
        />
      )}
    </>
  );
}
