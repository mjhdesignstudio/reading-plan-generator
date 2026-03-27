import { useState, useEffect, useRef } from "react";
import "./readingplandisplay.css";
import generatePDF from "react-to-pdf";

export function ReadingPlanDisplay({ plan }) {
  const [schedule, setSchedule] = useState([]);

  // Update local schedule when plan changes
  useEffect(() => {
    if (plan?.schedule) {
      setSchedule(plan.schedule);
    }
  }, [plan?.schedule]);

  const targetRef = useRef();

  const toggleComplete = (index) => {
    const newSchedule = [...schedule];
    newSchedule[index].completed = !newSchedule[index].completed;
    setSchedule(newSchedule);
  };

  if (!plan) {
    return (
      <div>
        <div className="no-plan">
          <h3>No Plan Generated</h3>
          <p>
            Fill in the form and click "Generate Reading Plan" to see your
            schedule
          </p>
        </div>
      </div>
    );
  }

  const completedDays = schedule.filter((day) => day.completed).length;
  const progress =
    schedule.length > 0 ? (completedDays / schedule.length) * 100 : 0;

  return (
    <div className="plan-container">
      <div ref={targetRef}>
        <h2>Your Reading Plan</h2>

        {/* Plan Summary */}
        <div>
          <h3 className="book-title">{plan.bookTitle}</h3>
          <div>
            <div>
              <span>Total Pages: </span>
              <span>{plan.totalPages}</span>
            </div>
            <div>
              <span>Pages per Day: </span>
              <span>{plan.pagesPerDay}</span>
            </div>
            <div>
              <span>Duration: </span>
              <span>{schedule.length} days</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <div>
              <span>Progress: </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div>
              <div style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div className="reading-plan-container">
          <h3 className="reading-schedule">Reading Schedule</h3>
          <div>
            {schedule.map((item, index) => (
              <div key={index}>
                <div className="schedule-day">
                  <div
                    className={`text-sm ${item.completed ? "line-through text-gray-400" : "text-gray-900"}`}
                  >
                    {item.day}
                  </div>
                  <div
                    className={`text-xs ${item.completed ? "line-through text-gray-400" : "text-gray-500"}`}
                  >
                    {item.pages}
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => toggleComplete(index)}
                      className="progress-checkbox"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        onClick={() =>
          generatePDF(targetRef, {
            filename: "reading-plan.pdf",
            page: { margin: 20 },
          })
        }
        className="download-pdf-button"
      >
        Download PDF
      </button>
    </div>
  );
}
