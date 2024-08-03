"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
export default function VerticalProgress({
  percentage,
  color,
  delay = 1,
  label,
}: any) {
  return (
    <div>
      <p>{label}</p>
      <div className="h-32 w-4 rounded-full bg-slate-100">
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: `${percentage * 20}%` }}
          transition={{
            type: "spring",
            duration: 4,
            stiffness: 30,
            damping: 4,
            delay: 0.5,
          }}
          className="h-48 w-4 self-end rounded-full" // Update the class name
          style={{ backgroundColor: "#0372f5" }}
        />
      </div>
    </div>
  );
}
