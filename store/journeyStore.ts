import { create } from "zustand";
import { createClient } from "@/utils/supabase/client";
type JourneyStore = {
  journeys: any[];
  addJourney: (journey: any) => void;
  fetchJourneys: () => void;
  fetchedJourneys: boolean;
  sendJourneyToDB: (journey: any) => void;
};

export const useJourneyStore = create<JourneyStore>((set, get) => ({
  journeys: [],
  fetchedJourneys: false,
  addJourney: async (journey) => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.from("journeys").insert([journey]);

      if (error) {
        console.log("Error adding journey:", error);
        return;
      }

      if (data) {
        set({ journeys: [...get().journeys, journey] });
      } else {
        console.log("No journey data found");
      }
    } catch (error) {
      console.error("Error in addJourney:", error);
    }
  },
  fetchJourneys: async () => {
    try {
      if (get().fetchedJourneys) return;
      const supabase = createClient();
      const { data: journeys, error: journeyError } = await supabase
        .from("journeys")
        .select();

      if (journeyError) {
        console.log("Error fetching journeys:", journeyError);
        return;
      }

      if (journeys) {
        set({ journeys, fetchedJourneys: true });
      } else {
        console.log("No journeys found");
      }
    } catch (error) {
      console.error("Error in fetchJourneys:", error);
    }
  },
  sendJourneyToDB: async (journey) => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.from("journeys").insert([journey]);

      if (error) {
        console.log("Error adding journey:", error);
        return;
      }

      if (data) {
        set({ journeys: [...get().journeys, journey] });
      } else {
        console.log("No journey data found");
      }
    } catch (error) {
      console.error("Error in sendJourneyToDB:", error);
    }
  },
}));
