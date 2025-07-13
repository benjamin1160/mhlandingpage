import { QuizEngine } from "@/components/QuizEngine";
import { LiveHomePreview } from "@/components/LiveHomePreview";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-900 text-white px-4 py-10 flex flex-col md:flex-row justify-center items-start gap-8">
      {/* Left: Quiz */}
      <div className="w-full md:w-1/2 max-w-lg">
        <QuizEngine />
      </div>

      {/* Right: Evolving Home Preview */}
      <div className="w-full md:w-1/2">
        <LiveHomePreview />
      </div>
    </main>
  );
}