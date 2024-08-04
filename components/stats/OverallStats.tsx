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
  return (
    <div className="relative flex flex-1 flex-col items-center gap-2">
      <div className="flex flex-row justify-center">
        <FaQuoteLeft className="text-md mr-1" fill="white" />
        <p className="text-center font-serif text-xl font-extrabold text-white md:text-3xl">
          {journey.title}
        </p>
        <FaQuoteRight className="text-md ml-1" fill="white" />
      </div>
      <div className="flex w-full flex-col gap-2 border-1 md:flex-row md:justify-between">
        <div className="w-full md:order-3 md:w-[35%]">
          <GraphAverage />
        </div>
        {/* Stacked cards favorite container */}
        <div className="order-2 w-[35%]">
          <p>Favorites</p>
          <StackedCards />
        </div>
        {/* Total logs/emoji */}
        <div className="flex items-center gap-4 self-start rounded-lg bg-white p-4 shadow-md md:order-1">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
            <motion.p
              variants={animationVariants}
              initial="initial"
              whileHover="hover"
              className="backface-visibility-hidden text-3xl will-change-transform"
              style={{ transform: "translateZ(0)" }}
            >
              {findMostEmoji(logs)}
            </motion.p>
          </div>
          <div>
            <p className="text-lg font-semibold text-primary">Total Logs</p>
            <p className="text-2xl font-bold">{logs.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
