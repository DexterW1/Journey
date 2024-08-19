import { create } from "zustand";
import { createClient } from "@/utils/supabase/client";
import { checkDuplicateTitle } from "@/utils/helperfunctions/helpers";
import { useUserStore } from "@/store/userStore";
type JourneyStore = {
  journeys: any[];
  selectedJourneyId: any;
  setSelectedJourneyId: (id: {}) => void;
  addJourney: (title: string, template: string[]) => void;
  editJourney: (id: string, title: string) => void;
  fetchJourneys: () => void;
  fetchedJourneys: boolean;
  deleteJourney: (id: string) => void;
};

export const useJourneyStore = create<JourneyStore>((set, get) => ({
  journeys: [],
  fetchedJourneys: false,
  selectedJourneyId: "",
  setSelectedJourneyId: (id) => {
    set({ selectedJourneyId: id });
  },
  deleteJourney: async (id) => {
    try {
      const supabase = createClient();
      const decrementJourneyCount =
        useUserStore.getState().decrementJourneyCount;
      const { data, error } = await supabase
        .from("journeys")
        .delete()
        .eq("id", id)
        .select();
      if (error) {
        console.log("Error deleting journey:", error);
        return;
      }
      if (data) {
        console.log("Journey deleted successfully", data);
        decrementJourneyCount();
      }
    } catch (error) {
      console.error("Error in deleteJourney:", error);
    }
  },
  addJourney: async (title, template) => {
    try {
      const user = useUserStore.getState().user;
      if (await checkDuplicateTitle(title, user)) {
        console.log("Title already exists");
        return;
      }
      const supabase = createClient();
      const { data, error } = await supabase
        .from("journeys")
        .insert({
          title,
          template,
        })
        .select();

      if (error) {
        console.log("Error adding journey:", error);
        return;
      }
      if (data) {
        console.log("Journey added successfully", data);
      }
    } catch (error) {
      console.error("Error in addJourney:", error);
    }
  },
  fetchJourneys: async () => {
    const user = useUserStore.getState().user;
    try {
      const supabase = createClient();
      const { data: journeys, error: journeyError } = await supabase
        .from("journeys")
        .select()
        .eq("user_id", user.id);

      if (journeyError) {
        console.log("Error fetching journeys:", journeyError);
        return;
      }

      if (journeys) {
        set({ journeys, fetchedJourneys: true });
        // console.log("Journey fetched", journeys);
      } else {
        console.log("No journeys found");
      }
    } catch (error) {
      console.error("Error in fetchJourneys:", error);
    }
  },
  editJourney: async (id, title) => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("journeys")
        .update({ title })
        .eq("id", id)
        .select();
      if (data) {
        console.log("Journey edited successfully", data);
        set((state) => ({
          journeys: state.journeys.map((journey) =>
            journey.id === id ? { ...journey, title } : journey,
          ),
        }));
      }
      if (error) {
        console.error("Error editing journey", error);
      }
    } catch (error) {
      console.error("Error in editJourney:", error);
    }
  },
}));
