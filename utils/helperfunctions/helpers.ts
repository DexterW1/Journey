import { createClient } from "@/utils/supabase/client";
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
