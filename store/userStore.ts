import { create } from "zustand";
import { createClient } from "@/utils/supabase/client";
type UserStore = {
  user: any | null;
  fetchUser: () => void;
  fetchedUser: boolean;
};
export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  fetchedUser: false,
  fetchUser: async () => {
    try {
      if (get().fetchedUser) return;
      const supabase = createClient();
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        console.log("Authentication error:", authError);
        return;
      }

      if (!user?.id) {
        console.log("User ID not found");
        return;
      }

      const { data, error: userError } = await supabase
        .from("users")
        .select()
        .eq("id", user.id)
        .single(); // Use single() for fetching one record

      if (userError) {
        console.log("Error fetching user data:", userError);
        return;
      }

      if (data) {
        set({ user: data, fetchedUser: true });
      } else {
        console.log("No user data found");
      }
    } catch (error) {
      console.error("Error in fetchUser:", error);
    }
  },
}));
