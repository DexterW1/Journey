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
  }, [fetchedUser]);
  if (!user) return <div>Loading...</div>;
  return (
    <div className="flex w-full flex-1 flex-col sm:max-w-6xl">
      <NavBar />
      <AnimatePresence>
        {user.stage === 0 && (
          <motion.div
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 2, delay: 1 }}
          >
            <GetStarted user={user} />
          </motion.div>
        )}
      </AnimatePresence>
      <Dashboard user={user} journey={journeys} />
    </div>
  );
}
// <div className="flex w-full flex-1 flex-col px-4 pt-8"></div>;
