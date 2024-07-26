"use client";
import React, { useState } from "react";
import {
  Select,
  SelectItem,
  Input,
  Divider,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useJourneyStore } from "@/store/journeyStore";
import { useUserStore } from "@/store/userStore";
import { motion, AnimatePresence } from "framer-motion";
import JourneyCard from "@/components/dashboardUI/JourneyCard";
import AddJourney from "@/components/modals/AddJourney";
import GreetingCard from "@/components/dashboardUI/GreetingCard";
import Weeklydisplay from "@/components/dashboardUI/Weeklydisplay";
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
export default function Dashboard({ user, journey }: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedJourney, setSelectedJourney] = useState<any>(null);
  const deleteJourney = useJourneyStore((state) => state.deleteJourney);
  const handleDeleteJourney = () => {
    if (selectedJourney) {
      deleteJourney(selectedJourney.id);
    }
  };
  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 lg:grid lg:grid-cols-3 lg:gap-8">
        <section className="flex flex-col gap-4 lg:col-span-1">
          <GreetingCard />
          <Weeklydisplay />
          <div className="order-2 flex flex-col gap-4 rounded-xl bg-cardBackground p-4 lg:order-1">
            <p className="text-large text-textPrimary">My Journeys</p>
            <Divider />
            {journey.map((journey: any) => (
              <motion.div
                onClick={() => setSelectedJourney(journey)}
                key={journey.id}
                className="cursor-pointer"
              >
                <JourneyCard key={journey.id} journey={journey} />
              </motion.div>
            ))}
            {/* Add new Journey Button */}
            {journey.length < 5 && (
              <div
                onClick={onOpen}
                className="flex cursor-pointer flex-row items-center justify-center rounded-xl border-2 border-dashed border-primary py-10"
              >
                <p className="text-3xl text-primary">+</p>
              </div>
            )}
          </div>
        </section>
        <section className="flex flex-col rounded-xl border-3 border-cardBackground p-4 lg:col-span-2">
          {selectedJourney && (
            <>
              <JourneyCard journey={selectedJourney} />
              <Button onPress={handleDeleteJourney}>Delete</Button>
            </>
          )}
        </section>
      </div>
      <AddJourney isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}
