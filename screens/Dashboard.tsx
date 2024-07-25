"use client";
import React from "react";
import { ScrollShadow } from "@nextui-org/react";
import { motion } from "framer-motion";
import JourneyCard from "@/components/dashboardUI/JourneyCard";
import GreetingCard from "@/components/dashboardUI/GreetingCard";
import Weeklydisplay from "@/components/dashboardUI/Weeklydisplay";
export default function Dashboard({ user, journey }: any) {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <section className="flex flex-col gap-4 sm:flex-row xl:gap-12">
        <GreetingCard />
        <Weeklydisplay />
      </section>
      {/* Jounrey List && Main Content Container */}
      <section className="flex flex-1 flex-col gap-4 lg:flex-row xl:gap-12">
        <ScrollShadow className="order-2 flex flex-col gap-4 rounded-xl bg-cardBackground p-4 lg:order-1 lg:w-[20.3rem]">
          {journey.map((journey: any) => (
            <motion.div
              key={journey.id}
              drag
              className="cursor-pointer"
              dragSnapToOrigin
            >
              <JourneyCard key={journey.id} journey={journey} />
            </motion.div>
          ))}
          {/* Add new Journey Button */}
          <div className="flex flex-row items-center justify-center rounded-xl border-2 border-dashed border-primary py-10">
            <p className="text-3xl text-primary">+</p>
          </div>
        </ScrollShadow>
        <div className="lg:order2 order-1 flex flex-col rounded-xl border-2 border-secondary bg-white p-4 lg:flex-1">
          main content
        </div>
      </section>
    </div>
  );
}
