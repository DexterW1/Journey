import React, { useState } from "react";
import { Button } from "@nextui-org/react";
type LogProps = {
  created_at: string;
  emoji: string;
  summary: string;
  time_day: string;
  id: string;
  journey_id: string;
  user_id: string;
  metric: {
    [key: string]: number;
  };
};

type DisplayTaskProps = {
  setCurrentScreen: (value: number) => void;
  logs: LogProps[] | null;
};

const LogItem = ({ log }: { log: LogProps }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative flex flex-col gap-2 rounded-xl bg-white p-4 shadow-md">
      <div className="flex flex-row items-center gap-2">
        <p className="font-serif text-lg font-semibold">{log.time_day}</p>
        <p className="font-serif text-lg font-semibold">{log.emoji}</p>
      </div>
      <p
        className={`font-serif text-lg font-semibold ${
          !isExpanded ? "line-clamp-2" : ""
        }`}
      >
        {log.summary}
      </p>
      <div className="flex flex-row gap-2">
        {Object.entries(log.metric).map(([key, value]) => (
          <div key={key} className="flex flex-col gap-1">
            <p className="font-serif text-lg font-semibold">{key}</p>
            <p className="font-serif text-lg font-semibold">{value}</p>
          </div>
        ))}
      </div>
      {log.summary.length > 100 && (
        <button
          onClick={handleToggle}
          className="mt-2 text-blue-500 hover:underline"
        >
          {isExpanded ? "Show Less" : "Show More"}
        </button>
      )}
      <div
        className={`roundex-xl absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-white to-transparent ${
          !isExpanded && "block"
        }`}
      />
    </div>
  );
};

export default function DisplayTask({
  setCurrentScreen,
  logs,
}: DisplayTaskProps) {
  return (
    <div>
      <p className="mb-4 font-serif text-[1.7rem] font-semibold leading-none text-textEmphasis">
        Logs
      </p>
      <Button onPress={() => setCurrentScreen(1)}>Add</Button>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {logs?.map((log) => <LogItem key={log.id} log={log} />)}
      </div>
    </div>
  );
}
