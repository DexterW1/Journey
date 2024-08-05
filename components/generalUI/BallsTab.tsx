import React from "react";
import { motion } from "framer-motion";
const tabs = ["screen1,screen2"];
export default function BallsTab({ selected, setSelected }: any) {
  return (
    <div className="flex flex-row">
      {tabs.map((tab) => (
        <Chip
          text={tab}
          selected={selected === tab}
          setSelected={setSelected}
          key={tab}
        />
      ))}
    </div>
  );
}

const Chip = ({ text, selected, setSelected }: any) => {
  return (
    <button onClick={() => setSelected(text)}>
      <span className="relative z-10 h-14 w-14 bg-blue-500"></span>
      {selected && (
        <motion.span
          layoutId={`pill-tab`}
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 z-0 rounded-md bg-accent"
        ></motion.span>
      )}
    </button>
  );
};
