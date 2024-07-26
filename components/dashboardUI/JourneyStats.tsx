"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useJourneyStore } from "@/store/journeyStore";

export default function JourneyStats({ journey }: any) {
  const deleteJourney = useJourneyStore((state) => state.deleteJourney);
  const handleDeleteJourney = () => {
    if (journey) {
      deleteJourney(journey.id);
    }
  };
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex flex-1 flex-col gap-4"
    >
      <div className="bg-primaryLight h-[40%] rounded-3xl p-4">
        <p className="text-large">{journey.title}</p>
        <p className="text-large">{journey.title}</p>
        <p className="text-large">{journey.title}</p>
        <p className="text-large">{journey.title}</p>
        <p className="text-large">{journey.title}</p>
      </div>
      <div className="flex flex-1 flex-col rounded-3xl bg-cardBackground p-4">
        <p className="text-large">{journey.title}</p>
        <p className="text-large">{journey.title}</p>
        <p className="text-large">{journey.title}</p>
        <p className="text-large">{journey.title}</p>
        <p className="text-large">{journey.title}</p>
      </div>
    </motion.section>
  );
}
