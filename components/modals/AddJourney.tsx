"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useUserStore } from "@/store/userStore";
import { useJourneyStore } from "@/store/journeyStore";
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
export default function AddJourney({ isOpen, onOpenChange }: any) {
  const [selectedVerb, setSelectedVerb] = useState("");
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
    if (selectedVerb && goal) {
      addJourney(selectedVerb + " " + goal);
    } else {
      setError("Please fill out the fields");
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      className="bg-background p-4"
    >
      <ModalContent>
        {(onClose) => (
          <ModalBody>
            <div className="flex flex-col gap-4 self-start">
              <div className="flex flex-row items-center gap-2">
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
              <div className="flex items-center justify-center">
                <Input
                  label="Enter a goal or habit"
                  placeholder="e.g. eating better, excerising more"
                  size="lg"
                  fullWidth={false}
                  onChange={handleGoalChange}
                  style={{ width: "300px" }}
                />
              </div>
            </div>
            <Button
              onPress={() => {
                handleCreateJourney();
                onClose();
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
