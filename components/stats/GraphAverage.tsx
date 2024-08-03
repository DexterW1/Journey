"use client";
import React, { useState, useEffect } from "react";
import { useLogStore } from "@/store/logStore";
import { motion, AnimatePresence } from "framer-motion";
import { getAverage } from "@/utils/helperfunctions/helpers";
import AdjProgress from "./AdjProgress";
import ProgressBar from "../logsUI/ProgressBar";
import ChipTabs from "../generalUI/ChipsTab";
const timeOptions = ["Week", "Month", "All"];
const colors = ["#0372f5", "#9652d9", "#18c964", "#f4a628", "#f41865"];
export default function GraphAverage() {
  const logs = useLogStore((state) => state.logs);
  const [average, setAverage] = useState(getAverage(logs));
  const [selected, setSelected] = useState("Week");
  useEffect(() => {
    setAverage(getAverage(logs));
    console.log(average);
  }, [logs]);
  return (
    <div className="flex flex-1 flex-col gap-2 rounded-xl bg-white p-4">
      {/* <p className="text-lg font-bold leading-none text-primary">Averages</p> */}
      {timeOptions.map((option) => (
        <AnimatePresence key={option} mode="wait">
          {selected === option && (
            <motion.div className="mb-2">
              {Object.keys(average[selected]).map((key, index) => (
                <div key={index}>
                  <p>{key}</p>
                  <AdjProgress
                    percentage={average[selected][key]}
                    color={colors[index]}
                  />
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      ))}
      <ChipTabs selected={selected} setSelected={setSelected} />
    </div>
  );
}
