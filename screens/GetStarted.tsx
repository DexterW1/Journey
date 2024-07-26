"use client";
import React, { useState } from "react";
import { Input, Select, SelectItem, Button } from "@nextui-org/react";
import { createClient } from "@/utils/supabase/client";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useJourneyStore } from "@/store/journeyStore";
import { useUserStore } from "@/store/userStore";
const options = [
  "Start",
  "Quit",
  "Improve",
  "Learn",
  "Grow",
  "Change",
  "Develop",
  "Monitor",
];
export default function GetStarted({ user }: any) {
  const [selectedVerb, setSelectedVerb] = useState("");
  const [goal, setGoal] = useState("");
  const updateUserStage = useUserStore((state) => state.updateUserStage);
  const addJourney = useJourneyStore((state) => state.addJourney);
  const handleVerbChange = (e: any) => {
    setSelectedVerb(e.target.value);
  };
  const handleGoalChange = (e: any) => {
    setGoal(e.target.value);
  };
  const handleCreateJourney = async () => {
    addJourney(selectedVerb + " " + goal);
    updateUserStage();
  };
  return (
    <section className="flex flex-1 flex-col items-center p-4">
      <motion.h1
        className="self-start text-4xl font-bold italic"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }} // Fade-in for h1
      >
        Welcome, <span className="text-primary">{user.first_name}</span>
      </motion.h1>
      <motion.p
        className="mt-[16px] self-start text-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }} // Fade-in for first p
      >
        Let's get started on your journey to personal growth!
      </motion.p>
      {/* Sentence Container */}
      <motion.div
        className="mt-4 flex flex-col gap-4 self-start md:flex-row"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <div className="flex flex-row items-center gap-4">
          <h1 className="text-lg">I want to... </h1>
          <div>
            <Select
              placeholder="Select a Verb"
              size="md"
              aria-label="select verb"
              // classNames={{ popoverContent: "bg-accent" }}
              fullWidth={false}
              style={{ width: "150px" }}
              onChange={handleVerbChange}
            >
              {options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
        <div>
          <Input
            label="Enter a goal or habit"
            // variant=""
            // classNames={{ inputWrapper: "bg-accent" }}
            placeholder="e.g. eating better, excerising more"
            size="lg"
            fullWidth={false}
            onChange={handleGoalChange}
            style={{ width: "300px" }}
          />
        </div>
      </motion.div>
      {/* Display goal */}
      <AnimatePresence>
        {goal && selectedVerb && (
          <>
            <motion.div
              className="relative mt-14 flex flex-col rounded-lg bg-cardBackground px-8 pb-4 pt-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <div className="flex flex-row">
                <FaQuoteLeft
                  className="mr-1 first-line:text-primary"
                  size={10}
                />
                <p className="text-center text-lg md:text-3xl">
                  <span className="mr-1 text-2xl underline md:text-4xl">
                    {selectedVerb}
                  </span>{" "}
                  {goal}
                </p>
                <FaQuoteRight className="ml-1 text-primary" size={10} />
              </div>
              <p className="mt-4 self-end text-2xl">- {user.first_name}</p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {goal && selectedVerb && (
          <motion.div
            className="mt-24 flex flex-col"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <Button
              onPress={handleCreateJourney}
              size="lg"
              radius="full"
              // color="primary"
              className="bg-buttonPrimary"
            >
              Begin Journey!
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
