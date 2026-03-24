import { useState } from "react";
import { ReadingPlanForm } from "./readingplanform";
import { ReadingPlanDisplay } from "./readingplandisplay";

export default function App() {
  const [readingPlan, setReadingPlan] = useState(null);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-300 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <h1>Reading Plan Generator</h1>
          <h4>Create a personalized reading schedule for your book</h4>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column - Form */}
          <div>
            <ReadingPlanForm onGenerate={setReadingPlan} />
          </div>

          {/* Right Column - Generated Plan */}
          <div>
            <ReadingPlanDisplay plan={readingPlan} />
          </div>
        </div>
      </main>
    </div>
  );
}
