import { create } from "zustand";
import { createClient } from "@/utils/supabase/client";
import { useJourneyStore } from "./journeyStore";
import { calculateStats } from "@/utils/helperfunctions/helpers";
type LogsByJourneyProp = {
  [key: string]: {
    stats: {
      mostEmoji: string;
      averages: {
        week: { [key: string]: number };
        month: { [key: string]: number };
        all: { [key: string]: number };
      };
    };
    logs: LogObject[];
  };
};

type LogObject = {
  created_at: string;
  emoji?: string;
  id: string;
  metric: {
    [key: string]: number;
  };
  summary?: string;
  time_day?: string;
  user_id?: string;
  journey_id?: string;
};

type LogStore = {
  loadingLog: boolean;
  logsByJourney: LogsByJourneyProp;
  addLog: (log: LogObject, journey_id: string) => void;
  fetchLogsForAllJourneys: () => void;
  deleteLog: (log_id: string, journey_id: string) => void;
  editLog: (log_id: string, newValues: LogObject, journey_id: string) => void;
};

export const useLogStore = create<LogStore>((set, get) => ({
  logsByJourney: {},
  loadingLog: true,
  addLog: async (log, journey_id) => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("logs")
        .insert([log])
        .select();
      if (data) {
        const updatedLogs = [
          ...(get().logsByJourney[journey_id]?.logs || []),
          ...data,
        ];
        const stats = calculateStats(updatedLogs);

        set((state) => ({
          logsByJourney: {
            ...state.logsByJourney,
            [journey_id]: {
              logs: updatedLogs,
              stats,
            },
          },
        }));
        console.log("Log added successfully", data);
      }
      if (error) {
        console.error("Error adding log", error);
      }
    } catch (error) {
      console.error(error);
    }
  },

  fetchLogsForAllJourneys: async () => {
    const journeyIds = useJourneyStore
      .getState()
      .journeys.map((journey) => journey.id);
    try {
      const supabase = createClient();
      const allLogsByJourney: LogsByJourneyProp = {};

      for (const journey_id of journeyIds) {
        const { data, error } = await supabase
          .from("logs")
          .select("*")
          .eq("journey_id", journey_id)
          .order("created_at", { ascending: false });

        if (data) {
          const logs = data as LogObject[];
          const stats = calculateStats(logs);

          allLogsByJourney[journey_id] = {
            logs,
            stats,
          };
        } else if (error) {
          console.log(`Error fetching logs for journey ${journey_id}`, error);
        } else {
          console.log(`No logs found for journey ${journey_id}`);
        }
      }

      set({ logsByJourney: allLogsByJourney, loadingLog: false });
    } catch (error) {
      console.error(error);
    }
  },

  deleteLog: async (log_id, journey_id) => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("logs")
        .delete()
        .eq("id", log_id)
        .select();
      if (data) {
        const updatedLogs =
          get().logsByJourney[journey_id]?.logs.filter(
            (log) => log.id !== log_id,
          ) || [];
        const stats = calculateStats(updatedLogs);

        set((state) => ({
          logsByJourney: {
            ...state.logsByJourney,
            [journey_id]: {
              logs: updatedLogs,
              stats,
            },
          },
        }));
        console.log("Log deleted successfully", data);
      }
      if (error) {
        console.error("Error deleting log", error);
      }
    } catch (error) {
      console.error(error);
    }
  },

  editLog: async (log_id, newValues, journey_id) => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("logs")
        .update(newValues)
        .eq("id", log_id)
        .select();
      if (data) {
        const updatedLogs =
          get().logsByJourney[journey_id]?.logs.map((log) =>
            log.id === log_id ? { ...log, ...newValues } : log,
          ) || [];
        const stats = calculateStats(updatedLogs);

        set((state) => ({
          logsByJourney: {
            ...state.logsByJourney,
            [journey_id]: {
              logs: updatedLogs,
              stats,
            },
          },
        }));
        console.log("Log updated successfully", data);
      }
      if (error) {
        console.error("Error updating log", error);
      }
    } catch (error) {
      console.error(error);
    }
  },
}));
