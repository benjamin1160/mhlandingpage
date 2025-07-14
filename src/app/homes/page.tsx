// src/app/homes/page.tsx
"use client";

import HomesSpreadsheet from "@/components/HomesSpreadsheet";

export default function HomesAdminPage() {
  return (
    <main className="min-h-screen bg-white px-8 py-12">
      <h1 className="mb-6 text-4xl font-bold">Homes Database</h1>
      <HomesSpreadsheet />
    </main>
  );
}
