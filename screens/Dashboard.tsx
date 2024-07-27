"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectItem,
  Input,
  Divider,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import JourneyCard from "@/components/dashboardUI/JourneyCard";
import AddJourney from "@/components/modals/AddJourney";
import GreetingCard from "@/components/dashboardUI/GreetingCard";
import Weeklydisplay from "@/components/dashboardUI/Weeklydisplay";
import JourneyStats from "@/components/dashboardUI/JourneyStats";

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
  const [selectedJourney, setSelectedJourney] = useState<any>(
    journey[0] ?? null,
  );
  const [newJourneyAnimation, setNewJourneyAnimation] = useState(false);

  useEffect(() => {
    if (journey.length > 0) {
      setSelectedJourney(journey[0]);
    }
    setNewJourneyAnimation(true);
    const timer = setTimeout(() => {
      setNewJourneyAnimation(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [journey]);

  const handleSelectJourney = (journey: any) => {
    if (selectedJourney === journey) {
      setSelectedJourney(null);
    } else {
      setSelectedJourney(journey);
    }
  };

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 lg:grid lg:grid-cols-3 lg:gap-8">
        <section className="flex flex-col gap-4 lg:col-span-1">
          <GreetingCard />
          <Weeklydisplay />
          {/* For mobile: Display JourneyStats below GreetingCard and Weeklydisplay */}
          <div className="lg:hidden">
            <AnimatePresence>
              {selectedJourney && <JourneyStats journey={selectedJourney} />}
            </AnimatePresence>
          </div>
          <div className="order-2 flex flex-col gap-4 rounded-xl bg-cardBackground p-4 lg:order-1">
            <p className="font-serif text-[1.7rem] font-semibold leading-none text-textEmphasis">
              Journeys
            </p>
            <AnimatePresence initial={false}>
              {journey.map((journey: any) => (
                <motion.div
                  onClick={() => handleSelectJourney(journey)}
                  key={journey.id}
                  className={`cursor-pointer ${
                    selectedJourney?.id === journey.id
                      ? "rounded-2xl border-3 border-accent"
                      : ""
                  }`}
                  initial={{ opacity: 0, x: newJourneyAnimation ? 0 : -150 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -150 }}
                  transition={{ duration: 1.5 }}
                >
                  <JourneyCard key={journey.id} journey={journey} />
                </motion.div>
              ))}
            </AnimatePresence>
            {/* Add new Journey Button */}
            {journey.length < 5 && (
              <div
                onClick={onOpen}
                className="flex cursor-pointer flex-row items-center justify-center rounded-xl border-2 border-dashed border-primary py-1"
              >
                <p className="text-3xl text-primary">+</p>
              </div>
            )}
          </div>
        </section>
        <section className="flex flex-col lg:col-span-2">
          {/* For large screens: Display JourneyStats beside the journey list */}
          <div className="hidden lg:flex lg:flex-1 lg:flex-col">
            <AnimatePresence>
              {selectedJourney && <JourneyStats journey={selectedJourney} />}
            </AnimatePresence>
          </div>
        </section>
      </div>
      <AddJourney isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}
