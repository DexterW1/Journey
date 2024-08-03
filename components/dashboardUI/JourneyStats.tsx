"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollShadow } from "@nextui-org/react";
import { useLogStore } from "@/store/logStore";
import { useJourneyStore } from "@/store/journeyStore";
import DisplayTask from "../logsUI/DisplayTask";
import AddTask from "@/components/logsUI/AddTask";
import OverallStats from "../stats/OverallStats";

export default function JourneyStats({ journey }: any) {
  const deleteJourney = useJourneyStore((state) => state.deleteJourney);
  const [currentScreen, setCurrentScreen] = useState(0);
  const fetchLogs = useLogStore((state) => state.fetchLogs);
  const logs = useLogStore((state) => state.logs);
  const handleDeleteJourney = () => {
    if (journey) {
      deleteJourney(journey.id);
    }
  };
  useEffect(() => {
    if (journey) {
      fetchLogs(journey.id);
    }
  }, [journey.id]);
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="flex flex-1 flex-col gap-4 border"
    >
      <div className="h-full max-h-[35vh] rounded-2xl bg-primaryLight p-4">
        {/* Quote Container */}
        <OverallStats journey={journey} logs={logs} />
      </div>
      {/* journeystats all details */}
      <ScrollShadow
        hideScrollBar
        size={20}
        className="h-[50vh] overflow-y-auto rounded-3xl bg-cardBackground p-4 px-6 shadow-md"
      >
        <AnimatePresence mode="wait">
          {currentScreen === 1 ? (
            <motion.div
              key="add-task"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              <AddTask setCurrentScreen={setCurrentScreen} journey={journey} />
            </motion.div>
          ) : (
            <motion.div
              key="display-task"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <DisplayTask
                setCurrentScreen={setCurrentScreen}
                logs={logs}
                journey_id={journey.id}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </ScrollShadow>
    </motion.section>
  );
}
