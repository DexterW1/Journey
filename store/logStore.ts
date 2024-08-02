import { create } from "zustand";
import { createClient } from "@/utils/supabase/client";
import { lcov } from "node:test/reporters";
type LogObject = {
  created_at?: string;
  emoji?: string;
  id?: string;
  metric?: {
    [key: string]: number;
  };
  summary?: string;
  time_day?: string;
  user_id?: string;
};
type LogStore = {
  logs: any[];
  addLog: (log: any, journey_id: string) => void;
  fetchLogs: (journey_id: string) => void;
  deleteLog: (log_id: string) => void;
  editLog: (log_id: string, newValues: LogObject) => void;
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
        set((state) => ({ logs: [...data, ...state.logs] }));
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
        .eq("journey_id", journey_id)
        .order("created_at", { ascending: false });
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
  deleteLog: async (log_id) => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("logs")
        .delete()
        .eq("id", log_id)
        .select();
      if (data) {
        console.log("Log deleted successfully", data);
        set((state) => ({
          logs: state.logs.filter((log) => log.id !== log_id),
        }));
      }
      if (error) {
        console.error("Error deleting log", error);
      }
    } catch (error) {
      console.error(error);
    }
  },
  editLog: async (log_id, newValues) => {
    try {
      console.log("newValues", newValues);
      const supabase = createClient();
      const { data, error } = await supabase
        .from("logs")
        .update(newValues)
        .eq("id", log_id)
        .select();
      if (data) {
        console.log("Log updated successfully", data);
        set((state) => ({
          logs: state.logs.map((log) =>
            log.id === log_id ? { ...log, ...newValues } : log,
          ),
        }));
      }
      if (error) {
        console.error("Error updating log", error);
      }
    } catch (error) {
      console.error(error);
    }
  },
}));
