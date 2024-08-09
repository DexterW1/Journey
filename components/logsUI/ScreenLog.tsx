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
  const handleInputChange = (index: number, value: string) => {
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
    <div className="mx-auto flex max-w-md flex-col space-y-6 p-6">
      <h1 className="text-center text-2xl font-bold text-textPrimary">
        Create Your Journey Template
      </h1>

      <Select
        label="Number of tracking rows"
        onChange={(e) => setRows(e.target.value)}
        defaultSelectedKeys={[rows]}
        className="mx-auto max-w-xs"
      >
        {[1, 2, 3, 4, 5].map((num) => (
          <SelectItem key={num} value={num}>
            {num}
          </SelectItem>
        ))}
      </Select>

      <AnimatePresence>
        <div className="space-y-4">
          {Array.from({ length: parseInt(rows) }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 * i }}
            >
              <Input
                label={`Row ${i + 1}`}
                placeholder={`e.g. ${placeholder[i]}`}
                value={inputValues[i] || ""}
                onChange={(e) => handleInputChange(i, e.target.value)}
                fullWidth
              />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
}
