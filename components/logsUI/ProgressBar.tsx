import React from "react";
import { motion, useSpring } from "framer-motion";
type ProgressBarProps = {
  percentage: string;
  color?: string;
  // label?: string;
  delay: number;
};
export default function ProgressBar({
  percentage,
  color,
  // label,
  delay = 1,
}: ProgressBarProps) {
  return (
    // <div className="flex flex-1 flex-row items-center gap-2">
    <div className="h-4 w-full rounded-full bg-slate-300">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: percentage }}
        transition={{
          type: "spring",
          duration: 4,
          stiffness: 30,
          damping: 4,
          delay: 0.5 * delay,
        }}
        className={`h-4 rounded-full`} // Update the class name
        style={{ backgroundColor: color }}
      />
    </div>
    // </div>
  );
}
