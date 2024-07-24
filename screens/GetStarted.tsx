"use client";
import React, { useState } from "react";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
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
  const handleVerbChange = (e: any) => {
    setSelectedVerb(e.target.value);
  };
  const handleGoalChange = (e: any) => {
    setGoal(e.target.value);
  };
  return (
    <section className="flex flex-1 flex-col items-center px-4">
      <motion.h1
        className="text-neutral self-start text-4xl font-bold italic"
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
        className="mt-4 flex flex-col gap-4 self-start"
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
          <motion.div
            className="relative mt-24 flex flex-row"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <FaQuoteLeft className="mr-2 text-primary" size={10} />
            <p className="text-center text-lg">
              <span className="mr-1 text-2xl underline">{selectedVerb} </span>
              {goal}
            </p>
            <FaQuoteRight className="ml-2 text-primary" size={10} />
            <p className="absolute -bottom-10 right-0 self-end text-3xl">
              - {user.first_name}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
//  <section className="h-[80vh] border">
//    <motion.h1
//      className="text-neutral self-start text-4xl font-bold italic"
//      initial={{ opacity: 0, y: 20 }}
//      animate={{ opacity: 1, y: 0 }}
//      transition={{ duration: 1, delay: 0.4 }} // Fade-in for h1
//    >
//      Welcome, <span className="text-primary">{user.first_name}</span>
//    </motion.h1>
//    <motion.p
//      className="mt-[16px] self-start text-lg"
//      initial={{ opacity: 0, y: 20 }}
//      animate={{ opacity: 1, y: 0 }}
//      transition={{ duration: 1, delay: 0.6 }} // Fade-in for first p
//    >
//      Let's get started on your journey to personal growth!
//    </motion.p>
//    {/* Sentence Container */}
//    <motion.div
//      className="mt-4 flex flex-col gap-4 self-start"
//      initial={{ opacity: 0, y: 20 }}
//      animate={{ opacity: 1, y: 0 }}
//      transition={{ duration: 1, delay: 0.8 }}
//    >
//      <div className="flex flex-row items-center gap-4">
//        <h1 className="text-lg">I want to... </h1>
//        <div>
//          <Select
//            placeholder="Select a Verb"
//            size="md"
//            aria-label="select verb"
//            fullWidth={false}
//            style={{ width: "150px" }}
//            onChange={handleVerbChange}
//          >
//            {options.map((option) => (
//              <SelectItem key={option} value={option}>
//                {option}
//              </SelectItem>
//            ))}
//          </Select>
//        </div>
//      </div>
//      <div>
//        <Input
//          label="Enter a goal or habit"
//          placeholder="e.g. eating better, excerising more"
//          size="lg"
//          fullWidth={false}
//          onChange={handleGoalChange}
//          style={{ width: "300px" }}
//        />
//      </div>
//    </motion.div>
//    {/* Display goal */}
//    <AnimatePresence>
//      {goal && selectedVerb && (
//        <motion.div
//          className="mt-9 flex flex-row"
//          initial={{ opacity: 0, x: -20 }}
//          animate={{ opacity: 1, x: 0 }}
//          exit={{ opacity: 0, x: -20 }}
//          transition={{ duration: 1, delay: 1 }}
//        >
//          <FaQuoteLeft className="mr-2 text-primary" />
//          <p className="text-center text-lg">
//            <span className="text-3xl">{selectedVerb} </span>
//            {goal}
//          </p>
//          <FaQuoteRight className="ml-2 text-primary" />
//          <p className="self-center">- {user.first_name}</p>
//        </motion.div>
//      )}
//    </AnimatePresence>
//  </section>;
