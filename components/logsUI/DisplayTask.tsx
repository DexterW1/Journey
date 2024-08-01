import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
  cn,
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useLogStore } from "@/store/logStore";
import { FaPlus } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { useWindowSize } from "@uidotdev/usehooks";
// import { IoFilterOutline } from "react-icons/io5";

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
  const [currentLog, setCurrentLog] = useState<LogProps>(log);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const handleDeleteLog = async () => {
    setCurrentLog({} as LogProps);
    setTimeout(() => {
      deleteLog(log.id);
      fetchLogs(log.journey_id);
    }, 400);
  };

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentLog.id}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.5 }}
          onClick={onOpen}
          whileHover={{ scale: 1.03 }}
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
                <p className="text-md font-semibold">
                  {getDay(log.created_at)}
                </p>
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
            className={`text-md font-semibold text-textSecondary ${!isExpanded ? "line-clamp-2" : ""}`}
          >
            {log.summary}
          </p>
          {/* {log.summary.length > 20 && (
          <button
            onClick={handleToggle}
            className="mt-2 text-blue-500 hover:underline"
          >
            {isExpanded ? "Show Less" : "Show More"}
          </button>
        )} */}
        </motion.div>
      </AnimatePresence>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} closeButton={<></>}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="items-center justify-between">
                <div className="flex flex-row items-center gap-4">
                  <div className="flex h-14 w-14 flex-col items-center justify-center rounded-full bg-cardBackground">
                    <p className="text-4xl">{log.emoji}</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">
                      {getDay(log.created_at)}
                    </p>
                    <p className="text-medium font-semibold">
                      {format_date(log.created_at)}
                    </p>
                    <p className="text-medium">{log.time_day}</p>
                  </div>
                </div>

                <div>
                  <Dropdown>
                    <DropdownTrigger>
                      <button>
                        <HiDotsVertical size={25} />
                      </button>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem
                        key="edit"
                        startContent={
                          <EditDocumentIcon className={iconClasses} />
                        }
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
              </ModalHeader>
              <ModalBody>
                <p>hello {log.created_at}</p>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default function DisplayTask({
  setCurrentScreen,
  logs,
  journey_id,
}: DisplayTaskProps) {
  // const size = useWindowSize();
  const [funMode, setFunMode] = useState(false);
  const [currentJourneyId, setCurrentJourneyId] = useState(journey_id);
  const [logsDisplayed, setLogsDisplayed] = useState(6); // Initial logs displayed
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (journey_id !== currentJourneyId) {
      setCurrentJourneyId(journey_id);
      setLogsDisplayed(6);
    }
  }, [journey_id]);

  const handleLoadMore = () => {
    setLogsDisplayed(logsDisplayed + 3);
  };
  const logsToDisplay = logs?.slice(0, logsDisplayed);

  return (
    <div>
      <div className="mb-4 flex flex-row items-center justify-between">
        <p
          // onClick={handleHiddenKey}
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
          key={currentJourneyId}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.5 }}
          ref={containerRef}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {logsToDisplay?.map((log) => (
            <LogItem
              key={log.id}
              log={log}
              containerRef={containerRef}
              funMode={funMode}
            />
          ))}
        </motion.div>
      </AnimatePresence>
      {logs && logsDisplayed < logs.length && (
        <motion.div
          key="load-more"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-4 flex justify-center"
        >
          <Button color="primary" onPress={handleLoadMore} radius="full">
            Load More
          </Button>
        </motion.div>
      )}
    </div>
  );
}
