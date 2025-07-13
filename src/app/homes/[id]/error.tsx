"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomeError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("Error loading home page:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
      <h1 className="mb-4 text-2xl font-bold">Something went wrong</h1>
      <p className="mb-6 text-center">
        We couldn’t load that home. It may not exist or there was a network
        issue.
      </p>
      <div className="space-x-4">
        <button
          onClick={() => reset()}
          className="rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
        >
          Retry
        </button>
        <button
          onClick={() => router.push("/")}
          className="rounded bg-slate-200 px-4 py-2 text-slate-900 hover:bg-slate-300"
        >
          Back to Home
        </button>
      </div>
    </main>
  );
}
