"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
export default function AdjProgress({
  percentage = 1,
  color,
  delay = 1,
  label,
}: any) {
  const formatNumber = (number: number): string => {
    return number.toFixed(1);
  };
  return (
    <div className="relative h-4 w-full rounded-full bg-slate-300">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage * 20}%` }}
        drag="x"
        dragConstraints={{ left: 0, right: 100 }}
        dragElastic={{ right: 0.5 }}
        transition={{
          type: "spring",
          duration: 4,
          stiffness: 30,
          damping: 4,
          delay: 0.5 * delay,
        }}
        className={`relative h-4 rounded-full`} // Update the class name
        style={{ backgroundColor: color }}
      />
      <motion.p
        className="text-md absolute -top-1 font-semibold"
        initial={{ left: 0 }}
        animate={{ left: `${percentage * 20 + 5}%` }}
        transition={{
          type: "spring",
          duration: 4,
          stiffness: 30,
          damping: 4,
          delay: 0.5 * delay,
        }}
        style={{ color: color }}
      >
        {formatNumber(percentage)}
      </motion.p>
    </div>
  );
}
