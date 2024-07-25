"use client";
import React, { useState, useEffect, use } from "react";
import { createClient } from "@/utils/supabase/client";
import GetStarted from "@/screens/GetStarted";
import { useUserStore } from "@/store/userStore";
import { useJourneyStore } from "@/store/journeyStore";
import { AnimatePresence, motion } from "framer-motion";
import NavBar from "./NavBar";
import Dashboard from "@/screens/Dashboard";
export default function HomeContent() {
  const [render, setRender] = useState(true);
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
  }, [fetchedUser, user]);
  useEffect(() => {
    if (user) {
      if (user.stage === 0) {
        setRender(true);
      } else {
        setTimeout(() => {
          setRender(false);
        }, 1600);
      }
    }
  }, [user]);
  if (!user) return <div>Loading...</div>;
  return (
    <div className="flex w-full flex-1 flex-col sm:max-w-6xl">
      <NavBar />
      <AnimatePresence onExitComplete={() => setRender(false)}>
        {user.stage === 0 && (
          <motion.div
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 1.5 }}
          >
            <GetStarted user={user} />
          </motion.div>
        )}
      </AnimatePresence>
      {!render && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          <Dashboard user={user} journey={journeys} />
        </motion.div>
      )}
    </div>
  );
}
// <div className="flex w-full flex-1 flex-col px-4 pt-8"></div>;
