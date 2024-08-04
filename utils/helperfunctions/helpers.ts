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
export function getAverage(arr: logsType[]) {
  const metricSums: { [time: string]: { [key: string]: number } } = {
    Week: {},
    Month: {},
    All: {},
  };
  const metricCounts: { [time: string]: { [key: string]: number } } = {
    Week: {},
    Month: {},
    All: {},
  };

  const startOfWeek = new Date();
  startOfWeek.setHours(0, 0, 0, 0);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);

  const startOfMonth = new Date();
  startOfMonth.setHours(0, 0, 0, 0);
  startOfMonth.setDate(1);

  const endOfMonth = new Date(startOfMonth);
  endOfMonth.setMonth(startOfMonth.getMonth() + 1);

  arr.forEach((log: logsType) => {
    const metrics = log.metric;
    const createdAt = new Date(log.created_at);

    // Check and add metrics for "week"
    if (createdAt >= startOfWeek && createdAt < endOfWeek) {
      for (const key in metrics) {
        if (metrics.hasOwnProperty(key)) {
          if (!metricSums.Week[key]) {
            metricSums.Week[key] = 0;
            metricCounts.Week[key] = 0;
          }
          metricSums.Week[key] += metrics[key];
          metricCounts.Week[key] += 1;
        }
      }
    }

    // Check and add metrics for "month"
    if (createdAt >= startOfMonth && createdAt < endOfMonth) {
      for (const key in metrics) {
        if (metrics.hasOwnProperty(key)) {
          if (!metricSums.Month[key]) {
            metricSums.Month[key] = 0;
            metricCounts.Month[key] = 0;
          }
          metricSums.Month[key] += metrics[key];
          metricCounts.Month[key] += 1;
        }
      }
    }

    // Add metrics for "all"
    for (const key in metrics) {
      if (metrics.hasOwnProperty(key)) {
        if (!metricSums.All[key]) {
          metricSums.All[key] = 0;
          metricCounts.All[key] = 0;
        }
        metricSums.All[key] += metrics[key];
        metricCounts.All[key] += 1;
      }
    }
  });

  const metricAverages: { [time: string]: { [key: string]: number } } = {
    Week: {},
    Month: {},
    All: {},
  };

  for (const time in metricSums) {
    for (const key in metricSums[time]) {
      if (metricSums[time].hasOwnProperty(key)) {
        metricAverages[time][key] =
          metricSums[time][key] / metricCounts[time][key];
      }
    }
  }

  return metricAverages;
}
export const findMostEmoji = (logs: logsType[]) => {
  if (logs.length === 0) return "";
  if (logs.length === 1) return logs[0].emoji || "";
  const emojiCount: { [key: string]: number } = {};
  logs.forEach((log) => {
    if (log.emoji) {
      if (!emojiCount[log.emoji]) {
        emojiCount[log.emoji] = 0;
      }
      emojiCount[log.emoji] += 1;
    }
  });

  const mostEmoji = Object.keys(emojiCount).reduce((a, b) =>
    emojiCount[a] > emojiCount[b] ? a : b,
  );

  return mostEmoji;
};

export const calculateStats = (
  logs: any,
): {
  mostEmoji: string;
  averages: {
    week: { [key: string]: number };
    month: { [key: string]: number };
    all: { [key: string]: number };
  };
} => {
  const averagesByPeriod = getAverage(logs); // { Week: {}, Month: {}, All: {} }
  const mostEmoji = findMostEmoji(logs);

  // Map the 'Week', 'Month', 'All' periods to the desired structure
  const averages = {
    week: averagesByPeriod.Week,
    month: averagesByPeriod.Month,
    all: averagesByPeriod.All,
  };

  // Return the stats object with the required structure
  return {
    mostEmoji,
    averages,
  };
};
