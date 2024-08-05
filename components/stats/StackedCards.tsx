"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import SwipeCard from "./SwipeCard";
import { useLogStore } from "@/store/logStore";
import { useJourneyStore } from "@/store/journeyStore";
export default function StackedCards({ logs }: any) {
  const [apiError, setApiError] = useState(false);
  const selectedJourneyId = useJourneyStore((state) => state.selectedJourneyId);
  const supabase = createClient();
  const [log, setLog] = useState<any>([]);
  const [index, setIndex] = useState(0);
  const handIndexChange = (index: number) => {
    setIndex((index + log.length) % log.length);
  };
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const { data, error } = await supabase
          .from("logs")
          .select("*")
          .eq("fav", true)
          .eq("journey_id", selectedJourneyId.id);
        if (data) {
          setLog(data);
          console.log("Logs favorites set sucessfully", data);
        }
        if (error) {
          setLog([]);
          console.error("Error setting logs favorites", error);
        }
      } catch (error) {
        setApiError(true);
        console.error("Error setting logs favorites", error);
      }
    };
    fetchFavorites();
  }, [logs]);
  if (log.length < 1 || !log || !logs || apiError)
    return (
      <div className="flex h-full w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-cardBackground text-center">
        <p className="mb-4 text-xl font-bold text-white">No favorites yet</p>
        <p className="mb-4 text-white">
          You haven't favorited any cards. Explore and favorite at least two
          cards to see them here.
        </p>
      </div>
    );
  return (
    <motion.div
      className="flex h-full flex-1 flex-row justify-center"
      style={{ position: "relative" }}
    >
      <AnimatePresence initial={false}>
        <SwipeCard key={index + 1} frontCard={false} log={log[index]} />
        <SwipeCard
          key={index}
          frontCard={true}
          index={index}
          setIndex={handIndexChange}
          drag="x"
          log={log[index]}
          logLength={log.length}
        />
      </AnimatePresence>
    </motion.div>
  );
}
