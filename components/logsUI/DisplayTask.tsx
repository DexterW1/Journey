import React, { useState, useRef, useEffect } from "react";
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
import { motion, AnimatePresence } from "framer-motion";
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
  journey_id: string;
};

const LogItem = ({
  log,
  containerRef,
  funMode,
}: {
  funMode: boolean;
  containerRef: any;
  log: LogProps;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const deleteLog = useLogStore((state) => state.deleteLog);
  const fetchLogs = useLogStore((state) => state.fetchLogs);
  const [currentLogs, setCurrentLogs] = useState(log);
  const handleDeleteLog = async () => {
    // Instead of immediately deleting the log, trigger the animation first
    await new Promise<void>((resolve) => setTimeout(resolve, 500)); // Adjust time to match animation duration
    deleteLog(log.id);
    fetchLogs(log.journey_id);
  };

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={log.id} // Unique key for each card
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
        className="relative flex cursor-pointer flex-col gap-2 rounded-xl bg-white p-4 shadow-lg"
        drag={funMode}
        dragConstraints={containerRef}
      >
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
                  onPress={handleDeleteLog}
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
        </div>
        <p
          className={`text-md font-semibold text-textSecondary ${
            !isExpanded ? "line-clamp-2" : ""
          }`}
        >
          {log.summary}
        </p>
        {log.summary.length > 20 && (
          <button
            onClick={handleToggle}
            className="mt-2 text-blue-500 hover:underline"
          >
            {isExpanded ? "Show Less" : "Show More"}
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
export default function DisplayTask({
  setCurrentScreen,
  logs,
  journey_id,
}: DisplayTaskProps) {
  const [funMode, setFunMode] = useState(false);
  const [hiddenKey, setHiddenKey] = useState(0);
  const [currentJourneyId, setCurrentJourneyId] = useState(journey_id);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (journey_id !== currentJourneyId) {
      setCurrentJourneyId(journey_id);
    }
  }, [journey_id]);

  const handleHiddenKey = () => {
    if (hiddenKey < 5) {
      setHiddenKey(hiddenKey + 1);
    } else if (hiddenKey === 3) {
      setFunMode(true);
    } else if (hiddenKey === 4) {
      setFunMode(false);
      setHiddenKey(0);
    }
  };

  return (
    <div>
      <div className="mb-4 flex flex-row items-center justify-between">
        <p
          onClick={handleHiddenKey}
          className="font-serif text-[1.7rem] font-semibold leading-none text-textEmphasis"
        >
          Logs
        </p>
        <div className="flex flex-row gap-2">
          <Button
            className="bg-blue-500 text-white"
            onPress={() => setCurrentScreen(1)}
            startContent={<FaPlus fill="white" />}
            variant="shadow"
          >
            Add Log
          </Button>
        </div>
      </div>
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentJourneyId} // This key triggers the whole container animation
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.5 }}
          ref={containerRef}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {logs?.map((log) => (
            <LogItem
              key={log.id}
              log={log}
              containerRef={containerRef}
              funMode={funMode}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
