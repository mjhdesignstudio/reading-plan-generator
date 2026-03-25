import { useState } from "react";
import { ReadingPlanForm } from "./readingplanform";
import { ReadingPlanDisplay } from "./readingplandisplay";

export default function App() {
  const [readingPlan, setReadingPlan] = useState(null);

  return (
    <div className="container">
      {/* Header */}
      <header>
        <div className="header">
          <h1>Reading Plan Generator</h1>
          <h4>Create a personalized reading schedule for your book</h4>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <div>
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
      <hr />
      <footer>
        <div className="app-footer">
          <div>
            {" "}
            <a href="mailto:hello@mjhdesignstudio.com">
              hello@mjhdesignstudio.com
            </a>
          </div>
          <div>
            This app was coded by{" "}
            <a href="https://www.mjhdesignstudio.com">Melissa Hundley</a> and is
            open-source on{" "}
            <a href="https://github.com/mjhdesignstudio/reading-plan-generator">
              GitHub
            </a>
            .
          </div>
        </div>
      </footer>
    </div>
  );
}
