"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SwipeCard from "./SwipeCard";
import { useLogStore } from "@/store/logStore";
export default function StackedCards() {
  const logs = useLogStore((state) => state.logs);
  const [log, setLog] = useState(logs);
  const [index, setIndex] = useState(0);
  const handIndexChange = (index: number) => {
    setIndex((index + log.length) % log.length);
  };
  useEffect(() => {
    setLog(logs);
  }, [logs]);
  if (log.length < 2 || !log || !logs)
    return (
      <div className="flex h-full w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-cardBackground text-center">
        <p className="mb-4 text-xl font-bold text-white">No favorites yet</p>
        <p className="mb-4 text-white">
          You haven't favorited any cards. Explore and favorite some cards to
          see them here.
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