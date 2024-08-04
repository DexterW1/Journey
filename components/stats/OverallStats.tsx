"use client";

import React, { use, useEffect, useState } from "react";
import { getAverage } from "@/utils/helperfunctions/helpers";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { motion } from "framer-motion";
import { findMostEmoji } from "@/utils/helperfunctions/helpers";
import { DeleteDocumentIcon } from "@/components/icon/DeleteDocument";
import { EditDocumentIcon } from "@/components/icon/EditDocumentIcon";
import GraphAverage from "./GraphAverage";
import StackedCards from "./StackedCards";
const iconClasses =
  "text-xl text-default-500 pointer-events-none flex-shrink-0";
const animationVariants = {
  initial: { scale: 1, rotate: 0 },
  hover: {
    scale: 2,
    rotate: [-10, 10, -10, 0],
    transition: {
      duration: 1,
      times: [0, 0.3, 0.7, 1], // Controls the timing of the animation steps
    },
  },
};
export default function OverallStats({ journey, logs }: any) {
  if (logs === undefined) {
    return null;
  }
  if (logs.length === 0) {
    return (
      <div className="relative flex h-full flex-1 flex-col items-center gap-4 border-1 p-4">
        {/* Title */}
        <div className="flex flex-row justify-center">
          <FaQuoteLeft className="text-md mr-1" fill="white" />
          <p className="text-center font-serif text-xl font-extrabold text-white md:text-3xl">
            {journey.title}
          </p>
          <FaQuoteRight className="text-md ml-1" fill="white" />
        </div>
        {/* Placeholder Message */}
        <div className="mt-8 flex flex-col items-center justify-center rounded-lg bg-white p-4 shadow-md">
          <p className="mb-2 text-xl font-semibold text-gray-700">
            No logs yet!
          </p>
          <p className="text-md mb-4 text-gray-500">
            Start adding logs to see your journey's statistics.
          </p>
          <button className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primaryLight">
            Add your first log
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="relative flex h-full flex-1 flex-col items-center gap-4">
      {/* Title */}
      <div className="flex flex-row justify-center">
        <FaQuoteLeft className="text-md mr-1" fill="white" />
        <p className="text-center font-serif text-xl font-extrabold text-white md:text-3xl">
          {journey.title}
        </p>
        <FaQuoteRight className="text-md ml-1" fill="white" />
      </div>
      {/* Convert to grid each with own col on mobile it will just be 1 */}
      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Graph Average */}
        <div className="order-3 w-full lg:order-3">
          <GraphAverage logs={logs.logs} />
        </div>
        {/* Stacked cards favorite container */}
        <div className="order-1 h-[10rem] overflow-hidden lg:order-2 lg:h-full lg:overflow-visible">
          <StackedCards logs={logs.logs} />
        </div>
        {/* Total logs/emoji */}
        <div className="order-2 flex flex-1 flex-row justify-evenly gap-4 lg:order-1 lg:flex-col lg:justify-between">
          <div className="flex flex-1 items-center gap-4 rounded-lg bg-white p-4 shadow-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
              <motion.p
                variants={animationVariants}
                initial="initial"
                whileHover="hover"
                className="backface-visibility-hidden text-3xl will-change-transform"
                style={{ transform: "translateZ(0)" }}
              >
                {logs.stats.mostEmoji}
              </motion.p>
            </div>
            <div>
              <p className="text-lg font-semibold text-primary">Total Logs</p>
              <p className="text-2xl font-bold">{logs.length}</p>
            </div>
          </div>
          <div className="flex flex-1 items-center gap-4 rounded-lg bg-white p-4 shadow-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
              <motion.p
                variants={animationVariants}
                initial="initial"
                whileHover="hover"
                className="backface-visibility-hidden text-3xl will-change-transform"
                style={{ transform: "translateZ(0)" }}
              >
                {logs.stats.mostEmoji}
              </motion.p>
            </div>
            <div>
              <p className="text-lg font-semibold text-primary">Total Logs</p>
              <p className="text-2xl font-bold">{logs.logs.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
