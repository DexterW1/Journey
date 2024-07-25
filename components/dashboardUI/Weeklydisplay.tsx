import React from "react";
import { getWeekDates } from "@/utils/helperfunctions/helpers";

export default function WeeklyDisplay() {
  const currentDate = new Date(); // Get today's date
  const currentDay = currentDate.getDate(); // Extract the day of the month

  // Get the week dates using the helper function
  const weekDates = getWeekDates(currentDate);

  return (
    <div className="flex flex-row items-center justify-between rounded-xl bg-cardBackground px-4 py-2 sm:w-full sm:self-start">
      {weekDates.map(({ day, date }, index) => {
        const isToday = date === currentDay;
        return (
          <div
            key={index}
            className={`flex flex-col items-center ${
              isToday ? "rounded-full bg-primary px-1 py-[0.4rem]" : ""
            }`} // Conditional class for highlighting
          >
            <p
              className={`text-lg ${isToday ? "text-cardContentBackground" : ""}`}
            >
              {day}
            </p>
            <div className="flex h-9 w-9 flex-row items-center justify-center rounded-full bg-cardContentBackground">
              <p className="mt-1 text-lg">{date}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
