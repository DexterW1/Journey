import React, { useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
  cn,
} from "@nextui-org/react";
import { useLogStore } from "@/store/logStore";
import { FaPlus } from "react-icons/fa6";
import { motion } from "framer-motion";
import { IoFilterOutline } from "react-icons/io5";

import { EditDocumentIcon } from "../icon/EditDocumentIcon";
import { DeleteDocumentIcon } from "../icon/DeleteDocument";
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
const iconClasses =
  "text-xl text-default-500 pointer-events-none flex-shrink-0";
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
function format_date(date: string) {
  const formattedDate = new Date(date);
  const month = formattedDate.getMonth() + 1;
  const day = formattedDate.getDate();
  const year = formattedDate.getFullYear();
  return `${month}/${day}/${year}`;
}

type DisplayTaskProps = {
  setCurrentScreen: (value: number) => void;
  logs: LogProps[] | null;
};

const LogItem = ({ log }: { log: LogProps }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const deleteLog = useLogStore((state) => state.deleteLog);

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
            <p className="text-md font-semibold">{getDay(log.created_at)}</p>
            <p className="text-sm font-semibold">
              {format_date(log.created_at)}
            </p>
            <p className="text-sm">{log.time_day}</p>
          </div>
        </div>
        <div>
          <Dropdown>
            <DropdownTrigger>
              <button>
                <HiDotsVertical size={20} />
              </button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem
                key="edit"
                startContent={<EditDocumentIcon className={iconClasses} />}
              >
                Edit log
              </DropdownItem>
              <DropdownItem
                key="delete"
                className="text-danger"
                color="danger"
                onPress={() => deleteLog(log.id)}
                classNames={{
                  base: "hover:text-white bg-white",
                }}
                startContent={
                  <DeleteDocumentIcon
                    className={cn(iconClasses, "text-danger")}
                  />
                }
              >
                Delete log
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
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
    <div>
      <div className="mb-4 flex flex-row items-center justify-between">
        <p className="font-serif text-[1.7rem] font-semibold leading-none text-textEmphasis">
          Logs
        </p>
        <div className="flex flex-row gap-2">
          {/* <button className="">
            <IoFilterOutline stroke="white" size={20} />
          </button> */}
          <Button
            className="bg-blue-500 text-white"
            onPress={() => setCurrentScreen(1)}
            startContent={<FaPlus fill="white" />}
          >
            Add Log
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {logs?.map((log) => <LogItem key={log.id} log={log} />)}
      </div>
    </div>
  );
}
