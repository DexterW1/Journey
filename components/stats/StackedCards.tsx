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
      <div className="flex h-full w-full flex-1 flex-row items-center justify-center">
        <div className="border-1 p-4">
          <p>Favorite more than two logs!</p>
        </div>
      </div>
    );
  return (
    <motion.div
      className="flex h-full w-full flex-1 flex-row items-center justify-center"
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
