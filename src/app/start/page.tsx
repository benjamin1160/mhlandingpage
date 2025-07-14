import { QuizEngine } from "@/components/QuizEngine";
import { LiveHomePreview } from "@/components/LiveHomePreview";

export default function StartPage() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-center gap-8 bg-slate-900 px-4 py-10 text-white md:flex-row">
      {/* Left: Quiz */}
      <div className="w-full max-w-lg md:w-1/2">
        <QuizEngine />
      </div>

      {/* Right: Evolving Home Preview */}
      <div className="w-full md:w-1/2">
        <LiveHomePreview />
      </div>
    </main>
  );
}
