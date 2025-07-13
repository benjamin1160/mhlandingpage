export default function LoadingHome() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white">
      <div className="text-center">
        <p className="text-lg font-medium">Loading home details…</p>
        <div className="mt-4 h-2 w-32 animate-pulse rounded bg-slate-200" />
      </div>
    </main>
  );
}
