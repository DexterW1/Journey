"use client";
import React, { useEffect } from "react";
import { Select, SelectItem, Input } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
const placeholder = ["Happy", "Sad", "Energy", "Anxiety", "Productivity"];
export default function ScreenLog({
  rows,
  setRows,
  inputValues,
  setInputValues,
}: any) {
  const handleInputChange = (index: number, value: any) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };
  useEffect(() => {
    setInputValues(
      Array.from({ length: parseInt(rows) }, (_, i) => inputValues[i] || ""),
    );
  }, [rows]);
  return (
    <div className="flex h-full w-full flex-col">
      <h1 className="text-xl font-semibold underline">
        Let's create a template for this journey
      </h1>
      <Select
        onChange={(e) => setRows(e.target.value)}
        aria-label="row count select"
        placeholder="How many rows would you like to keep track of?"
        defaultSelectedKeys={[rows]}
      >
        <SelectItem key={1} value={1}>
          1
        </SelectItem>
        <SelectItem key={2} value={2}>
          2
        </SelectItem>
        <SelectItem key={3} value={3}>
          3
        </SelectItem>
        <SelectItem key={4} value={4}>
          4
        </SelectItem>
        <SelectItem key={5} value={5}>
          5
        </SelectItem>
      </Select>
      <AnimatePresence>
        <div className="flex flex-col gap-2">
          <p>Enter the valuesf</p>
          {Array.from({ length: parseInt(rows) }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Input
                label={`Row ${i + 1}`}
                placeholder={`e.g. ${placeholder[i]}`}
                size="sm"
                value={inputValues[i] || ""}
                onChange={(e) => handleInputChange(i, e.target.value)}
                fullWidth={true}
              />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
}
