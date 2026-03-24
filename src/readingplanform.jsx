import { useState } from "react";
import "./readingplanform.css";

export function ReadingPlanForm({ onGenerate }) {
  const [bookTitle, setBookTitle] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [readingDays, setReadingDays] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]);

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const toggleDay = (day) => {
    if (readingDays.includes(day)) {
      setReadingDays(readingDays.filter((d) => d !== day));
    } else {
      setReadingDays([...readingDays, day]);
    }
  };

  const generatePlan = () => {
    if (!bookTitle || !totalPages || !startDate || !endDate) {
      alert("Please fill in all fields");
      return;
    }

    const pages = parseInt(totalPages);
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calculate number of reading days
    let readingDaysCount = 0;
    const currentDate = new Date(start);

    while (currentDate <= end) {
      const dayName = currentDate.toLocaleDateString("en-US", {
        weekday: "long",
      });
      if (readingDays.includes(dayName)) {
        readingDaysCount++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const pagesPerDay = Math.ceil(pages / readingDaysCount);

    // Generate schedule
    const schedule = [];
    const scheduleDate = new Date(start);
    let pagesRemaining = pages;

    while (scheduleDate <= end && pagesRemaining > 0) {
      const dayName = scheduleDate.toLocaleDateString("en-US", {
        weekday: "long",
      });

      if (readingDays.includes(dayName)) {
        const pagesToRead = Math.min(pagesPerDay, pagesRemaining);
        schedule.push({
          day: scheduleDate.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          }),
          pages: `Pages ${pages - pagesRemaining + 1}-${pages - pagesRemaining + pagesToRead}`,
          completed: false,
        });
        pagesRemaining -= pagesToRead;
      }

      scheduleDate.setDate(scheduleDate.getDate() + 1);
    }

    const plan = {
      bookTitle,
      totalPages: pages,
      startDate,
      endDate,
      pagesPerDay,
      schedule,
    };

    onGenerate(plan);
  };

  return (
    <div className="rounded-lg border-2 border-gray-300 bg-white p-6">
      <h2>Book Details</h2>

      <div className="space-y-5">
        {/* Book Title */}
        <div>
          <label className="form-label">Book Title</label>
          <input
            type="text"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
            placeholder="Enter book title"
            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Total Pages */}
        <div>
          <label className="form-label">Total Pages</label>
          <input
            type="number"
            value={totalPages}
            onChange={(e) => setTotalPages(e.target.value)}
            placeholder="e.g., 300"
            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="form-label">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Reading Days */}
        <div>
          <label className="form-label">Reading Days</label>
          <div className="grid grid-cols-4 gap-2">
            {daysOfWeek.map((day) => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={`rounded border px-3 py-2 text-sm transition-colors ${
                  readingDays.includes(day)
                    ? "border-blue-500 bg-blue-500 text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {day.slice(0, 3)}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generatePlan}
          className="generate-button"
        >
          Generate Reading Plan
        </button>
      </div>
    </div>
  );
}
