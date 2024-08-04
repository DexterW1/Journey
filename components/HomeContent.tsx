"use client";
import React, { useState, useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import { useLogStore } from "@/store/logStore";
import { useJourneyStore } from "@/store/journeyStore";
import { AnimatePresence, motion } from "framer-motion";
import NavBar from "./NavBar";
import Dashboard from "@/screens/Dashboard";
import GetStarted from "@/screens/GetStarted";

export default function HomeContent() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const fetchUser = useUserStore((state) => state.fetchUser);
  const user = useUserStore((state) => state.user);
  const journeys = useJourneyStore((state) => state.journeys);
  const fetchJourneys = useJourneyStore((state) => state.fetchJourneys);
  const fetchedUser = useUserStore((state) => state.fetchedUser);
  const loadingLog = useLogStore((state) => state.loadingLog);
  const fetchLogsForAllJourneys = useLogStore(
    (state) => state.fetchLogsForAllJourneys,
  );

  useEffect(() => {
    const fetchAll = async () => {
      await fetchUser();
      await fetchJourneys(); // Ensure journeys are fetched and stored in Zustand
    };

    fetchAll();
  }, [fetchUser, fetchJourneys]);

  useEffect(() => {
    const fetchLogs = async () => {
      if (journeys.length > 0) {
        await fetchLogsForAllJourneys();
      }
    };

    fetchLogs();
  }, [journeys, fetchLogsForAllJourneys]);

  useEffect(() => {
    if (user) {
      if (user.stage === 0) {
        setShowDashboard(false);
        setTransitioning(true);
      } else {
        if (!transitioning) {
          fetchJourneys(); // Ensure journeys are fetched when user.stage changes
          setShowDashboard(true);
        }
      }
    }
  }, [user, transitioning, fetchJourneys]);

  const handleExitComplete = () => {
    setTransitioning(false);
    setShowDashboard(true);
  };

  if (user === null || loadingLog || journeys.length === 0)
    return <div>Loading...</div>;

  return (
    <div className="flex w-full flex-1 flex-col sm:max-w-7xl">
      <NavBar />
      <AnimatePresence onExitComplete={handleExitComplete}>
        {user.stage === 0 && (
          <motion.div
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 1.5 }}
            className="flex flex-1 flex-col"
          >
            <GetStarted user={user} />
          </motion.div>
        )}
      </AnimatePresence>
      {showDashboard && (
        <motion.div className="flex flex-1 flex-col" key="dashboard">
          <Dashboard user={user} journey={journeys} />
        </motion.div>
      )}
    </div>
  );
}
