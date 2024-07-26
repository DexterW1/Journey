"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import GetStarted from "@/screens/GetStarted";
import { useUserStore } from "@/store/userStore";
import { useJourneyStore } from "@/store/journeyStore";
import { AnimatePresence, motion } from "framer-motion";
import NavBar from "./NavBar";
import Dashboard from "@/screens/Dashboard";

export default function HomeContent() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [transitioning, setTransitioning] = useState(false); // Track transition
  const fetchUser = useUserStore((state) => state.fetchUser);
  const user = useUserStore((state) => state.user);
  const journeys = useJourneyStore((state) => state.journeys);
  const fetchJourneys = useJourneyStore((state) => state.fetchJourneys);
  const fetchedUser = useUserStore((state) => state.fetchedUser);

  useEffect(() => {
    const fetchAll = async () => {
      await fetchUser();
      await fetchJourneys();
    };
    if (!fetchedUser) {
      fetchAll();
    }
  }, [fetchedUser, fetchUser, fetchJourneys]);

  useEffect(() => {
    if (user) {
      if (user.stage === 0) {
        setShowDashboard(false);
        setTransitioning(true);
      } else {
        if (!transitioning) {
          fetchJourneys();
          setShowDashboard(true);
        }
      }
    }
  }, [user, transitioning]);

  const handleExitComplete = () => {
    setTransitioning(false);
    setShowDashboard(true);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="flex w-full flex-1 flex-col sm:max-w-7xl">
      <NavBar />
      <AnimatePresence onExitComplete={handleExitComplete}>
        {user.stage === 0 && (
          <motion.div
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 1.5 }}
          >
            <GetStarted user={user} />
          </motion.div>
        )}
      </AnimatePresence>
      {showDashboard && (
        <motion.div
          className="flex flex-1 flex-col"
          key="dashboard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Dashboard user={user} journey={journeys} />
        </motion.div>
      )}
    </div>
  );
}
