import { motion } from "framer-motion";
import { useState } from "react";

const tabs = ["Week", "Month", "All"];

const ChipTabs = ({ selected, setSelected }: any) => {
  // const [selected, setSelected] = useState(tabs[0]);

  return (
    <div className="flex flex-row items-center justify-center gap-2 rounded-xl bg-primaryLight p-2">
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
};

const Chip = ({ text, selected, setSelected }: any) => {
  return (
    <button
      onClick={() => setSelected(text)}
      className={`${
        selected
          ? "text-textEmphasis"
          : "text-primary hover:bg-primary hover:text-slate-200"
      } text-md relative rounded-md px-2.5 py-0.5 transition-colors`}
    >
      <span className="relative z-10 text-white">{text}</span>
      {selected && (
        <motion.span
          layoutId="pill-tab"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 z-0 rounded-md bg-accent"
        ></motion.span>
      )}
    </button>
  );
};

export default ChipTabs;
