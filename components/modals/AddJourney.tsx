"use client";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useUserStore } from "@/store/userStore";
import { useJourneyStore } from "@/store/journeyStore";
import ScreenLog from "../logsUI/ScreenLog";
import {
  Modal,
  ModalBody,
  ModalContent,
  Button,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
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
  goal,
}: any) => {
  return (
    <div className="flex h-full w-full flex-col gap-4">
      <div className="flex flex-row items-center gap-2">
        <h1 className="text-lg">I want to... </h1>
        <div>
          <Select
            placeholder="Select a Verb"
            size="md"
            aria-label="select verb"
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
      <div className="flex items-center justify-center">
        <Input
          label="Enter a goal or habit"
          value={goal}
          placeholder="e.g. eating better, excerising more"
          size="lg"
          fullWidth={false}
          onChange={handleGoalChange}
          style={{ width: "300px" }}
        />
      </div>
    </div>
  );
};
export default function AddJourney({ isOpen, onOpenChange }: any) {
  const [selectedVerb, setSelectedVerb] = useState("");
  const [currentScreen, setCurrentScreen] = useState(0);
  const [hasRendered, setHasRendered] = useState(false);
  const [rows, setRows] = useState("1");
  const [inputValues, setInputValues] = useState<string[]>([]);
  const [goal, setGoal] = useState("");
  const [error, setError] = useState("");
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
    } else {
      setError("Please fill out the fields");
    }
  };
  useEffect(() => {
    if (!hasRendered) {
      setHasRendered(true);
    }
  }, [hasRendered]);
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
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      className="min-h-[50%] bg-background p-4"
      classNames={{
        body: "flex flex-col gap-4 item-center justify-between",
        backdrop: "bg-overlay/20",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <ModalBody className="overflow-x-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                className="mt-8 flex flex-1 flex-col gap-4"
                key={currentScreen}
                initial={{
                  x: 300,
                  opacity: 0,
                }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {renderScreen()}
              </motion.div>
            </AnimatePresence>
            <div className="mt-4 flex justify-between">
              {currentScreen > 0 && (
                <Button onClick={() => setCurrentScreen(0)} className="mr-2">
                  Previous
                </Button>
              )}
              {currentScreen < 1 && ( // Update this condition based on the number of screens
                <Button onClick={() => setCurrentScreen(1)} className="ml-2">
                  Next
                </Button>
              )}
            </div>
            <Button
              onPress={() => {
                handleCreateJourney();
              }}
              className="bg-buttonPrimary"
            >
              Add Journey
            </Button>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
}
