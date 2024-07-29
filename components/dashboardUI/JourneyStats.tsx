"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollShadow } from "@nextui-org/react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { useLogStore } from "@/store/logStore";
import { useJourneyStore } from "@/store/journeyStore";
import DisplayTask from "../logsUI/DisplayTask";
import AddTask from "@/components/logsUI/AddTask";

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
      className="flex flex-1 flex-col gap-4"
    >
      <div className="h-[40%] rounded-2xl bg-primaryLight p-4">
        {/* Quote Container */}
        <div className="flex flex-row justify-center">
          <FaQuoteLeft className="text-md mr-2 text-white" />
          <p className="font-serif text-xl font-extrabold text-white">
            {journey.title}
          </p>
          <FaQuoteRight className="text-md ml-2 text-white" />
        </div>
      </div>
      <ScrollShadow
        hideScrollBar
        size={20}
        className="flex flex-1 flex-col overflow-y-auto rounded-3xl bg-cardBackground p-4 px-6"
      >
        <AnimatePresence mode="wait">
          {currentScreen === 1 ? (
            <motion.div
              key="add-task"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <AddTask setCurrentScreen={setCurrentScreen} journey={journey} />
            </motion.div>
          ) : (
            <motion.div
              key="display-task"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <DisplayTask setCurrentScreen={setCurrentScreen} logs={logs} />
            </motion.div>
          )}
        </AnimatePresence>
      </ScrollShadow>
    </motion.section>
  );
}
