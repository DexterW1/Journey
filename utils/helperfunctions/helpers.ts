import { createClient } from "@/utils/supabase/client";
import { logsType } from "../types";
export const checkDuplicateTitle = async (title: string, user: any) => {
  const supabase = createClient();

  // Convert the title to lowercase
  const lowercaseTitle = title.toLowerCase();

  // Fetch all journeys for the user
  const { data, error } = await supabase
    .from("journeys")
    .select("title")
    .eq("user_id", user.id);

  if (error) {
    console.error("Error checking duplicate title", error);
    return false;
  }

  // Check if any title matches the lowercaseTitle (case-insensitive)
  const isDuplicate = data.some(
    (journey: { title: string }) =>
      journey.title.toLowerCase() === lowercaseTitle,
  );

  return isDuplicate;
};
export function getWeekDates(referenceDate: any) {
  const weekArray = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const currentDayIndex = referenceDate.getDay();
  const startOfWeek = new Date(referenceDate);
  startOfWeek.setDate(referenceDate.getDate() - currentDayIndex);

  return weekArray.map((_, index) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + index);

    return {
      day: weekArray[index],
      date: date.getDate(), // Day of the month
      month: date.getMonth() + 1, // Month (1-based)
      year: date.getFullYear(), // Year
    };
  });
}
export function debounce(func: any, wait: any) {
  let timeout: any;
  return function (...args: any) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
export function getAverage(arr: logsType[], time: "week" | "month" | "all") {
  const metricSums: { [key: string]: number } = {};
  const metricCounts: { [key: string]: number } = {};

  arr.forEach((log: logsType) => {
    const metrics = log.metric;
    const createdAt = new Date(log.created_at);

    // Check if the log falls within the specified time range
    if (time === "week") {
      const startOfWeek = new Date();
      startOfWeek.setHours(0, 0, 0, 0);
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 7);

      if (createdAt < startOfWeek || createdAt >= endOfWeek) {
        return;
      }
    } else if (time === "month") {
      const startOfMonth = new Date();
      startOfMonth.setHours(0, 0, 0, 0);
      startOfMonth.setDate(1);
      const endOfMonth = new Date(startOfMonth);
      endOfMonth.setMonth(startOfMonth.getMonth() + 1);

      if (createdAt < startOfMonth || createdAt >= endOfMonth) {
        return;
      }
    }

    for (const key in metrics) {
      if (metrics.hasOwnProperty(key)) {
        if (!metricSums[key]) {
          metricSums[key] = 0;
          metricCounts[key] = 0;
        }
        metricSums[key] += metrics[key];
        metricCounts[key] += 1;
      }
    }
  });

  const metricAverages: { [key: string]: number } = {};
  for (const key in metricSums) {
    if (metricSums.hasOwnProperty(key)) {
      metricAverages[key] = metricSums[key] / metricCounts[key];
    }
  }

  return metricAverages;
}
