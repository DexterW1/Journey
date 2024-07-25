"use client";
import React from "react";
import { Divider, ScrollShadow } from "@nextui-org/react";
import { motion } from "framer-motion";
import JourneyCard from "@/components/dashboardUI/JourneyCard";
import GreetingCard from "@/components/dashboardUI/GreetingCard";
import Weeklydisplay from "@/components/dashboardUI/Weeklydisplay";

export default function Dashboard({ user, journey }: any) {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:grid lg:grid-cols-3 lg:gap-8">
      <section className="flex flex-col gap-4 lg:col-span-1">
        <GreetingCard />
        <Weeklydisplay />
        <div className="order-2 flex flex-col gap-4 rounded-xl bg-cardBackground p-4 lg:order-1">
          <p className="text-large text-textPrimary">My Journeys</p>
          <Divider />
          {journey.map((journey: any) => (
            <motion.div key={journey.id} className="cursor-pointer">
              <JourneyCard key={journey.id} journey={journey} />
            </motion.div>
          ))}
          {/* Add new Journey Button */}
          <div className="flex flex-row items-center justify-center rounded-xl border-2 border-dashed border-primary py-10">
            <p className="text-3xl text-primary">+</p>
          </div>
        </div>
      </section>
      <section className="flex flex-col rounded-xl border-2 border-secondary bg-white p-4 lg:col-span-2">
        main content
      </section>
    </div>
  );
}
