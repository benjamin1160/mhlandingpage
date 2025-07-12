"use client";

import { useState } from "react";
import { useHomeStore } from "@/state/homeStore";

const questions: {
  key: string;
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

  const current = questions[step];

  const handleSelect = (value: string | number) => {
    if (!current) return;
    setAnswer(current.key, value);
    setStep((prev) => prev + 1);
  };

  if (!current) {
    return (
      <div className="text-center text-2xl font-semibold text-emerald-400">
        You&apos;re all set! 🎉<br />
        Your dream home is shaping up...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{current.label}</h2>
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
  );
}
