"use client";
import React, { useState, useEffect } from "react";
import { useLogStore } from "@/store/logStore";
import { Tabs, Tab } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import { getAverage } from "@/utils/helperfunctions/helpers";
import VerticalProgress from "./VerticalProgress";
const timeOptions = ["week", "month", "all"];
export default function GraphAverage() {
  const logs = useLogStore((state) => state.logs);
  const [average, setAverage] = useState(getAverage(logs, "week"));
  useEffect(() => {
    setAverage(getAverage(logs, "week"));
  }, [logs]);
  return (
    <div className="flex flex-1 flex-col">
      <Tabs color="primary">
        <Tab value="week" title="Week">
          <div className="flex flex-1 flex-row justify-evenly">
            {Object.keys(average).map((key) => (
              <VerticalProgress
                percentage={average[key]}
                color="#0372f5"
                label={key}
              />
            ))}
          </div>
        </Tab>
        <Tab value="month" title="Month">
          weirdk
        </Tab>
        <Tab value="all" title="All">
          test
        </Tab>
      </Tabs>
    </div>
  );
}
