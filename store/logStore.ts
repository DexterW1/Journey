import { create } from "zustand";
import { createClient } from "@/utils/supabase/client";
type LogStore = {
  logs: string[];
  addLog: (log: any, journey_id: string) => void;
  fetchLogs: (journey_id: string) => void;
};

export const useLogStore = create<LogStore>((set) => ({
  logs: [],
  addLog: async (log) => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("logs")
        .insert([log])
        .select();
      if (data) {
        console.log("Log added successfully", data);
      }
      if (error) {
        console.error("Error adding log", error);
      }
    } catch (error) {
      console.error(error);
    }
  },
  fetchLogs: async (journey_id) => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("logs")
        .select("*")
        .eq("journey_id", journey_id);
      if (data) {
        set({ logs: data });
        console.log("Logs fetched successfully", data);
      }
      if (error) {
        console.log("No logs found");
      }
    } catch (error) {
      console.error(error);
    }
  },
}));
