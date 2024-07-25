import React from "react";

const weekArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function WeeklyDisplay() {
  const getCurrentDay = () => {
    const currentDate = new Date();
    return currentDate.getDay(); // Returns 0-6 for Sun-Sat
  };

  const currentDayIndex = getCurrentDay();
  return (
    <div className="bg-cardBackground border-cardBorder flex flex-1 flex-row items-center justify-evenly rounded-xl border-2 px-4 py-2">
      {weekArray.map((day, index) => (
        <div key={index} className="flex flex-col items-center">
          <p
            className={`bg-cardContentBackground text-textPrimary flex h-11 w-11 items-center justify-center rounded-full p-4 text-lg md:p-6 ${
              index === currentDayIndex ? "border-2 border-accent" : ""
            }`}
          >
            {day}
          </p>
        </div>
      ))}
    </div>
  );
}
