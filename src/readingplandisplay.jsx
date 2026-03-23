import { useState } from "react";

export function ReadingPlanDisplay({ plan }) {
  const [schedule, setSchedule] = useState([]);

  // Update local schedule when plan changes
  if (plan && schedule !== plan.schedule) {
    setSchedule(plan.schedule);
  }

  const toggleComplete = (index) => {
    const newSchedule = [...schedule];
    newSchedule[index].completed = !newSchedule[index].completed;
    setSchedule(newSchedule);
  };

  if (!plan) {
    return (
      <div className="flex h-full min-h-[400px] items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white p-8">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full border-4 border-gray-300"></div>
          <h3 className="mb-2 text-lg font-medium text-gray-700">
            No Plan Generated
          </h3>
          <p className="text-sm text-gray-500">
            Fill in the form and click "Generate Reading Plan" to see your
            schedule
          </p>
        </div>
      </div>
    );
  }

  const completedDays = schedule.filter((day) => day.completed).length;
  const progress = (completedDays / schedule.length) * 100;

  return (
    <div className="rounded-lg border-2 border-gray-300 bg-white p-6">
      <h2 className="mb-6 text-xl font-bold">Your Reading Plan</h2>

      {/* Plan Summary */}
      <div className="mb-6 rounded-lg bg-gray-50 p-4">
        <h3 className="mb-3 font-bold text-gray-900">{plan.bookTitle}</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Total Pages:</span>
            <span className="font-medium">{plan.totalPages}</span>
          </div>
          <div className="flex justify-between">
            <span>Pages per Day:</span>
            <span className="font-medium">{plan.pagesPerDay}</span>
          </div>
          <div className="flex justify-between">
            <span>Duration:</span>
            <span className="font-medium">{schedule.length} days</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="mb-1 flex justify-between text-xs text-gray-600">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-blue-500 transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Schedule */}
      <div>
        <h3 className="mb-3 font-medium text-gray-900">Reading Schedule</h3>
        <div className="max-h-[400px] space-y-2 overflow-y-auto">
          {schedule.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded border border-gray-200 p-3 hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleComplete(index)}
                className="h-5 w-5 cursor-pointer rounded border-gray-300"
              />
              <div className="flex-1">
                <div
                  className={`text-sm ${item.completed ? "line-through text-gray-400" : "text-gray-900"}`}
                >
                  {item.day}
                </div>
                <div
                  className={`text-xs ${item.completed ? "line-through text-gray-400" : "text-gray-500"}`}
                >
                  {item.pages}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
