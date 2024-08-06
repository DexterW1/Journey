"use client";
import React, { useEffect, useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import {
  motion,
  AnimatePresence,
  Reorder,
  useMotionValue,
} from "framer-motion";
import JourneyCard from "@/components/dashboardUI/JourneyCard";
import { useJourneyStore } from "@/store/journeyStore";
import AddJourney from "@/components/modals/AddJourney";
import GreetingCard from "@/components/dashboardUI/GreetingCard";
import Weeklydisplay from "@/components/dashboardUI/Weeklydisplay";
import JourneyStats from "@/components/dashboardUI/JourneyStats";

export default function Dashboard({ user, journey }: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedJourney, setSelectedJourney] = useState<any>(
    journey[0] ?? null,
  );
  const [journeyArr, setJourneyArr] = useState<any>(journey);
  const [newJourneyAnimation, setNewJourneyAnimation] = useState(false);
  const setSelectedJourneyId = useJourneyStore(
    (state) => state.setSelectedJourneyId,
  );

  useEffect(() => {
    if (journey.length > 0) {
      setSelectedJourney(journey[0]);
      setSelectedJourneyId(journey[0]);
    }
    setNewJourneyAnimation(true);
    const timer = setTimeout(() => {
      setNewJourneyAnimation(false);
    }, 500);
    setJourneyArr(journey);
    console.log("journeyArr", journeyArr);
    return () => clearTimeout(timer);
  }, [journey]);

  const handleSelectJourney = (journey: any) => {
    setSelectedJourney(journey);
    setSelectedJourneyId(journey);
  };
  useEffect(() => {
    setJourneyArr(journey);
  }, [journey]);

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
          {/* Journey selector container */}
          <div className="order-2 flex flex-col gap-4 rounded-xl bg-cardBackground p-4 shadow-md lg:order-1">
            <p className="font-serif text-[1.7rem] font-semibold leading-none text-textEmphasis">
              Journeys
            </p>
            <AnimatePresence initial={false}>
              <Reorder.Group
                axis="y"
                onReorder={setJourneyArr}
                values={journeyArr}
                className="flex flex-col gap-4"
              >
                {journeyArr.map((journey: any) => (
                  <Reorder.Item
                    id={journey.id}
                    value={journey}
                    key={journey.id}
                  >
                    <motion.div
                      onClick={() => handleSelectJourney(journey)}
                      className="relative cursor-pointer"
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 1 }}
                    >
                      <div className="z-2 relative">
                        <JourneyCard journey={journey} />
                      </div>

                      {selectedJourney?.id === journey.id && (
                        <motion.span
                          layoutId="selectedJourney"
                          transition={{
                            type: "spring",
                            duration: 0.9,
                            damping: 20,
                          }}
                          className="absolute -inset-0.5 z-10 rounded-2xl border-3 border-accent"
                        />
                      )}
                    </motion.div>
                  </Reorder.Item>
                ))}
              </Reorder.Group>
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
        {/* Display selected journeys */}
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
