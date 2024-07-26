import { create } from "zustand";
import { createClient } from "@/utils/supabase/client";
type UserStore = {
  user: any | null;
  fetchUser: () => void;
  incrementJourneyCount: () => void;
  decrementJourneyCount: () => void;
  updateUserStage: () => void;
  fetchedUser: boolean;
};
export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  fetchedUser: false,
  updateUserStage: async () => {
    const supabase = createClient();
    const { error } = await supabase
      .from("users")
      .update({ stage: get().user.stage + 1 })
      .eq("id", get().user.id);
    if (error) {
      console.error("Error updating user stage:", error);
      return;
    }
    set((state) => ({ user: { ...state.user, stage: state.user.stage + 1 } }));
  },
  incrementJourneyCount: async () => {
    const supabase = createClient();
    const { error } = await supabase
      .from("users")
      .update({ journey_count: get().user.journey_count + 1 })
      .eq("id", get().user.id);
    if (error) {
      console.error("Error incrementing journey count:", error);
      return;
    }
    set((state) => ({
      user: { ...state.user, journey_count: state.user.journey_count + 1 },
    }));
  },
  decrementJourneyCount: async () => {
    const supabase = createClient();
    const { error } = await supabase
      .from("users")
      .update({ journey_count: get().user.journey_count - 1 })
      .eq("id", get().user.id);
    if (error) {
      console.error("Error decrementing journey count:", error);
      return;
    }
    set((state) => ({
      user: { ...state.user, journey_count: state.user.journey_count - 1 },
    }));
  },
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
