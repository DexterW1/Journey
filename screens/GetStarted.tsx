"use client";
import React from "react";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { motion } from "framer-motion";
const options = [
  "Quit",
  "Start",
  "Continue",
  "Track",
  "Improve",
  "Learn",
  "Grow",
  "Change",
  "Develop",
  "Monitor",
];
export default function GetStarted({ user }: any) {
  return (
    <motion.div
      className="flex w-full flex-1 flex-col px-4 pt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }} // Container fade-in effect
    >
      <motion.h1
        className="text-neutral text-4xl font-bold italic"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }} // Fade-in for h1
      >
        Welcome, <span className="text-primary">{user.first_name}</span>
      </motion.h1>
      <motion.p
        className="mt-4 text-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }} // Fade-in for first p
      >
        Let's get started on your journey to personal growth!
      </motion.p>
      {/* Sentence Container */}
      <motion.div
        className="mt-4 flex flex-col gap-4"
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
              fullWidth={false}
              style={{ width: "150px" }}
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
            placeholder="e.g. read 20 pages a day"
            size="lg"
            fullWidth={false}
            style={{ width: "300px" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
