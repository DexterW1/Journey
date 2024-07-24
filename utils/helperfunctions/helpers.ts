import { createClient } from "@/utils/supabase/client";
export const checkDuplicateTitle = async (title: string, user: any) => {
  const supabase = createClient();
  // Check if the current user already has the same title in the database
  const { data, error } = await supabase
    .from("journeys")
    .select()
    .eq("title", title)
    .eq("user_id", user.id);
  if (error) {
    console.error("Error checking duplicate title", error);
    return false;
  }
  return data.length > 0;
};
