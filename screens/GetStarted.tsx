"use client";
import React, { useState, useEffect } from "react";
import { Input, Select, SelectItem, Button } from "@nextui-org/react";
import { createClient } from "@/utils/supabase/client";
// import ScreenLog from "@/components/logsUI/ScreenLog";
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
const placeholder = ["Happy", "Sad", "Energy", "Anxiety", "Productivity"];
const ScreenSentence = ({
  handleVerbChange,
  handleGoalChange,
  selectedVerb,
  Goal,
}: any) => {
  return (
    <motion.div
      className="flex flex-col gap-4 self-start md:flex-row lg:mt-[9.5%]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 1 }}
    >
      <div className="flex flex-row items-center gap-4">
        <h1 className="text-lg">I want to... </h1>
        <div>
          <Select
            placeholder="Select a Verb"
            size="md"
            aria-label="select verb"
            // classNames={{ popoverContent: "bg-accent" }}
            defaultSelectedKeys={[selectedVerb]}
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
          placeholder={Goal || "e.g. eating better, excerising more"}
          size="lg"
          fullWidth={false}
          onChange={handleGoalChange}
          style={{ width: "300px" }}
        />
      </div>
    </motion.div>
  );
};
const ScreenLog = ({ rows, setRows, inputValues, setInputValues }: any) => {
  const handleInputChange = (index: number, value: any) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };
  useEffect(() => {
    setInputValues(
      Array.from({ length: parseInt(rows) }, (_, i) => inputValues[i] || ""),
    );
  }, [rows]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 1 }}
      className="flex h-full w-full flex-col gap-4"
    >
      <h1 className="text-xl font-semibold underline">
        Let's create a template for this journey
      </h1>
      <Select
        onChange={(e) => setRows(e.target.value)}
        aria-label="row count select"
        placeholder="How many rows would you like to keep track of?"
        defaultSelectedKeys={[rows]}
      >
        <SelectItem key={1} value={1}>
          1
        </SelectItem>
        <SelectItem key={2} value={2}>
          2
        </SelectItem>
        <SelectItem key={3} value={3}>
          3
        </SelectItem>
        <SelectItem key={4} value={4}>
          4
        </SelectItem>
        <SelectItem key={5} value={5}>
          5
        </SelectItem>
      </Select>
      <AnimatePresence>
        <div className="flex flex-col gap-2">
          {Array.from({ length: parseInt(rows) }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Input
                label={`Row ${i + 1}`}
                placeholder={`e.g. ${placeholder[i]}`}
                size="sm"
                value={inputValues[i] || ""}
                onChange={(e) => handleInputChange(i, e.target.value)}
                fullWidth={true}
              />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </motion.div>
  );
};

export default function GetStarted({ user }: any) {
  const [selectedVerb, setSelectedVerb] = useState("");
  const [currentScreen, setCurrentScreen] = useState(0);
  const [goal, setGoal] = useState("");
  const [rows, setRows] = useState("1");
  const [inputValues, setInputValues] = useState<string[]>([""]);
  const updateUserStage = useUserStore((state) => state.updateUserStage);
  const addJourney = useJourneyStore((state) => state.addJourney);
  const handleVerbChange = (e: any) => {
    setSelectedVerb(e.target.value);
  };
  const handleGoalChange = (e: any) => {
    setGoal(e.target.value);
  };
  const handleCreateJourney = async () => {
    if (selectedVerb && goal && inputValues.length > 0) {
      addJourney(selectedVerb + " " + goal, inputValues);
      updateUserStage();
    } else {
      // setError("Please fill out the fields");
    }
  };
  const renderScreen = () => {
    switch (currentScreen) {
      case 0:
        return (
          <ScreenSentence
            handleVerbChange={handleVerbChange}
            selectedVerb={selectedVerb}
            goal={goal}
            handleGoalChange={handleGoalChange}
          />
        );
      case 1:
        return (
          <ScreenLog
            rows={rows}
            setRows={setRows}
            inputValues={inputValues}
            setInputValues={setInputValues}
          />
        );
      default:
        return null;
    }
  };
  return (
    <section className="flex flex-1 flex-col items-center justify-between p-4 lg:items-start lg:justify-normal">
      <div className="flex w-full flex-1 flex-col border lg:flex-row">
        <div className="lg:w-1/2">
          <motion.h1
            className="self-start text-4xl font-bold italic"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }} // Fade-in for h1
          >
            Welcome, <span className="text-primary">{user.first_name}</span>
          </motion.h1>
          <motion.p
            className="self-start text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }} // Fade-in for first p
          >
            Let's get started on your journey to personal growth!
          </motion.p>
          {/* Screen container */}
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }} // Fade-in for sentence container
              className="mt-4"
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
          {/* Button Container */}
          <AnimatePresence>
            {goal && selectedVerb && (
              <motion.div
                className="mt-4 hidden w-full flex-row justify-between lg:flex"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 1, delay: 1 }}
              >
                <Button
                  onClick={() => setCurrentScreen(0)}
                  size="lg"
                  radius="full"
                  className="bg-buttonPrimary"
                >
                  Prev
                </Button>
                {/* {currentScreen === 1&&() ? (} */}
                <Button
                  onPress={() => setCurrentScreen(1)}
                  size="lg"
                  radius="full"
                  className="bg-buttonPrimary"
                >
                  Next
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Display goal */}
        <div className="lg:mt-[9%] lg:w-1/2 lg:pl-8">
          <AnimatePresence>
            {goal && selectedVerb && (
              <>
                <motion.div
                  className="relative mt-4 flex flex-col rounded-lg border-3 border-primary bg-cardBackground px-8 py-6 lg:self-start"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 1, delay: 1 }}
                >
                  <div className="flex flex-row flex-wrap">
                    <FaQuoteLeft
                      className="mr-1 first-line:text-primary"
                      size={10}
                    />
                    <p className="text-center text-lg md:text-3xl">
                      <span className="mr-1 font-serif text-2xl italic underline md:text-4xl">
                        {selectedVerb}
                      </span>{" "}
                      {goal}
                    </p>
                    <FaQuoteRight className="ml-1 text-primary" size={10} />
                  </div>
                  <p className="mt-2 self-end text-2xl">- {user.first_name}</p>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Button Container */}
      <AnimatePresence>
        {goal && selectedVerb && (
          <motion.div
            className="mt-4 flex w-full flex-row justify-end gap-2 lg:hidden lg:justify-normal"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 1, delay: 1 }}
          >
            {currentScreen !== 0 && (
              <Button
                onClick={() => setCurrentScreen(0)}
                size="lg"
                radius="full"
                className="bg-buttonPrimary"
              >
                Prev
              </Button>
            )}

            {currentScreen == 0 ? (
              <Button
                onPress={() => setCurrentScreen(1)}
                size="lg"
                radius="full"
                className="bg-buttonPrimary"
              >
                Next
              </Button>
            ) : (
              <Button
                onPress={handleCreateJourney}
                size="lg"
                radius="full"
                className="bg-buttonPrimary"
              >
                <p className="text-lg text-textEmphasis">Create Journey</p>
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
