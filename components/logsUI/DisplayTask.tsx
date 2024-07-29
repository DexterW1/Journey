import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { Popover } from "@nextui-org/react";
import { HiDotsVertical } from "react-icons/hi";
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

const getDay = (date: string) => {
  const time = new Date(date);
  const today = new Date();

  // Reset time to midnight to compare only dates
  const isToday =
    time.getFullYear() === today.getFullYear() &&
    time.getMonth() === today.getMonth() &&
    time.getDate() === today.getDate();

  if (isToday) {
    return "Today";
  }

  const options = { weekday: "long" as const };
  return new Intl.DateTimeFormat("en-US", options).format(time);
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
    <div className="relative flex flex-col gap-2 rounded-xl bg-white p-4 shadow-lg">
      <div className="flex flex-row items-center justify-between gap-2">
        <div className="flex flex-row items-center gap-2">
          <div className="flex h-12 w-12 flex-col items-center justify-center rounded-full bg-cardBackground">
            <p className="text-3xl">{log.emoji}</p>
          </div>
          <div>
            <p>{getDay(log.created_at)}</p>
            <p className="text-md font-semibold">{log.time_day}</p>
          </div>
        </div>
        <div>
          <button>
            <HiDotsVertical size={20} />
          </button>
        </div>
        {/* <p className="font-serif text-lg font-semibold">{log.emoji}</p> */}
      </div>
      <p
        className={`text-md font-semibold text-textSecondary ${
          !isExpanded ? "line-clamp-2" : ""
        }`}
      >
        {log.summary}
      </p>
      {/* <div className="flex flex-row gap-2">
        {Object.entries(log.metric).map(([key, value]) => (
          <div key={key} className="flex flex-col gap-1">
            <p className="font-serif text-lg font-semibold">{key}</p>
            <p className="font-serif text-lg font-semibold">{value}</p>
          </div>
        ))}
      </div> */}
      {log.summary.length > 20 && (
        <button
          onClick={handleToggle}
          className="mt-2 text-blue-500 hover:underline"
        >
          {isExpanded ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default function DisplayTask({
  setCurrentScreen,
  logs,
}: DisplayTaskProps) {
  return (
    <div className="">
      <p className="mb-4 font-serif text-[1.7rem] font-semibold leading-none text-textEmphasis">
        Logs
      </p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {logs?.map((log) => <LogItem key={log.id} log={log} />)}
        {/* <div className="h-8 w-8 border-2" /> */}
        <Button onPress={() => setCurrentScreen(1)}>Add</Button>
      </div>
    </div>
  );
}
