'use client';

import { useState } from 'react';

interface FormData {
  budget: string;
  bedrooms: string;
  location: string;
  land: string;
  timeline: string;
  name: string;
  email: string;
}

const fields: (keyof FormData)[] = [
  'budget',
  'bedrooms',
  'location',
  'land',
  'timeline',
];

export default function CustomizerPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>({
    budget: '',
    bedrooms: '',
    location: '',
    land: '',
    timeline: '',
    name: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name as keyof FormData]: value }));
  };

  const handleNext = () => setStep((s) => s + 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/customizer', {
      method: 'POST',
      body: JSON.stringify(form),
    });
    setStep((s) => s + 1);
  };

  if (step < fields.length) {
    const field = fields[step]!;
    return (
      <div className="space-y-4 p-8">
        <label className="block">
          {field.charAt(0).toUpperCase() + field.slice(1)}:
          <input
            name={field}
            value={form[field]}
            onChange={handleChange}
            className="ml-2 border p-1"
          />
        </label>
        <button
          onClick={handleNext}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Next
        </button>
      </div>
    );
  }

  if (step === fields.length) {
    return (
      <form onSubmit={handleSubmit} className="space-y-4 p-8">
        <h2 className="text-xl">Almost done—tell us how to reach you</h2>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="block w-full border p-2"
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="block w-full border p-2"
        />
        <button
          type="submit"
          className="rounded bg-green-600 px-4 py-2 text-white"
        >
          View Results
        </button>
      </form>
    );
  }

  return <p className="p-8">Thanks! We&apos;ll be in touch with homes that match your needs.</p>;
}
