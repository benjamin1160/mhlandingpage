// src/app/homes/page.tsx
"use client";

import HomesSpreadsheet from "@/components/HomesSpreadsheet";

export default function HomesAdminPage() {
  return (
    <main className="min-h-screen bg-white px-8 py-12">
      {/* prettier-ignore */}
      <h1 className="text-4xl font-bold mb-6">Homes Database</h1>
      <HomesSpreadsheet />
    </main>
  );
}
