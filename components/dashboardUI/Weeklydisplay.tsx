import React from "react";

const weekArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function WeeklyDisplay() {
  const getCurrentDay = () => {
    const currentDate = new Date();
    return currentDate.getDay(); // Returns 0-6 for Sun-Sat
  };

  const currentDayIndex = getCurrentDay();
  return (
    <div className="flex flex-1 flex-row items-center justify-between rounded-xl bg-cardBackground px-4 py-2 sm:justify-evenly">
      {weekArray.map((day, index) => (
        <div key={index} className="flex flex-col items-center">
          <p
            className={`flex h-11 w-11 items-center justify-center rounded-full bg-cardContentBackground p-4 text-lg text-textPrimary md:p-6 ${
              index === currentDayIndex ? "border-2 border-secondary" : ""
            }`}
          >
            {day}
          </p>
        </div>
      ))}
    </div>
  );
}
