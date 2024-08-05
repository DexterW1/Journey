import React, { useState, useRef, useEffect, use } from "react";
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
  ModalFooter,
  Slider,
  Textarea,
  ScrollShadow,
} from "@nextui-org/react";
import { useLogStore } from "@/store/logStore";
import { FaPlus, FaStar, FaRegStar } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import ProgressBar from "./ProgressBar";
// import { IoFilterOutline } from "react-icons/io5";

import { EditDocumentIcon } from "../icon/EditDocumentIcon";
import { DeleteDocumentIcon } from "../icon/DeleteDocument";
import { HiDotsVertical } from "react-icons/hi";
import { MySlider } from "../nextuimodifier/MySlider";
const colors = ["#0372f5", "#9652d9", "#18c964", "#f4a628", "#f41865"];
const colorOptions = ["blue", "purple", "green", "yellow", "red"];
type LogProps = {
  created_at?: string;
  emoji?: string;
  id?: string;
  metric: {
    [key: string]: number;
  };
  summary?: string;
  time_day?: string;
  user_id?: string;
  journey_id?: string;
  fav?: boolean;
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
  journey_id,
}: {
  funMode: boolean;
  containerRef: any;
  log: LogProps;
  journey_id: string;
}) => {
  const [editMode, setEditMode] = useState(false);
  const [sliderValues, setSliderValues] = useState<{}>(log.metric || {});
  const [newSummary, setNewSummary] = useState(log.summary);
  const [favorite, setFavorite] = useState(log.fav);
  const deleteLog = useLogStore((state) => state.deleteLog);
  // const fetchLogs = useLogStore((state) => state.fetchLogs);
  const editLog = useLogStore((state) => state.editLog);
  const [currentLog, setCurrentLog] = useState<LogProps>(log);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const handleDeleteLog = async () => {
    setCurrentLog({} as LogProps);
    setTimeout(() => {
      deleteLog(log.id ?? "", journey_id);
      // fetchLogs(log.journey_id);
    }, 400);
  };
  const handleFavorite = () => {
    const newValues = {
      ...currentLog,
      fav: !favorite,
    };
    editLog(currentLog.id ?? "", newValues, journey_id);
    setFavorite(!favorite);
  };
  const handleCardClick = () => {
    if (!funMode) {
      onOpen();
    }
  };
  const handleEditLog = () => {
    if (!isOpen) {
      onOpenChange();
    }
    setEditMode(true);
  };
  const handleSubmitEdit = () => {
    const newValues = {
      ...currentLog,
      summary: newSummary,
      metric: sliderValues,
    };
    editLog(currentLog.id ?? "", newValues, journey_id);

    setEditMode(false);
  };
  const handleSliderChange = (label: string, value: number) => {
    setSliderValues((prevValues: any) => ({
      ...prevValues,
      [label]: value,
    }));
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
          onClick={handleCardClick}
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
                  {getDay(log.created_at ?? "")}
                </p>
                <p className="text-sm font-semibold">
                  {format_date(log.created_at ?? "")}
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
                    key="favoritek"
                    onPress={handleFavorite}
                    startContent={
                      log.fav ? (
                        <FaStar fill="gold" size={21} />
                      ) : (
                        <div>
                          <FaRegStar stroke="gold" fill="gold" size={21} />
                        </div>
                      )
                    }
                  >
                    Favorite
                  </DropdownItem>
                  <DropdownItem
                    key="edit"
                    onPress={handleEditLog}
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
          <p className="text-md line-clamp-2 font-semibold text-textSecondary">
            {log.summary}
          </p>
        </motion.div>
      </AnimatePresence>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} closeButton={<></>}>
        <ModalContent>
          {(onClose) => {
            return (
              <>
                <ModalHeader className="items-center justify-between">
                  <div className="flex flex-row items-center gap-4">
                    <div className="flex h-14 w-14 flex-col items-center justify-center rounded-full bg-cardBackground">
                      <p className="text-4xl">{log.emoji}</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold">
                        {getDay(log.created_at ?? "")}
                      </p>
                      <p className="text-medium font-semibold">
                        {format_date(log.created_at ?? "")}
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
                          onPress={handleEditLog}
                        >
                          Edit log
                        </DropdownItem>
                        <DropdownItem
                          key="delete"
                          className="text-danger"
                          color="danger"
                          onPress={() => {
                            handleDeleteLog();
                            onClose();
                          }}
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
                <ModalBody className="overflow-hidden pb-5">
                  <AnimatePresence mode="wait">
                    {editMode === false ? (
                      <motion.div
                        key="progress-bars"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col gap-1"
                      >
                        {Object.keys(log.metric ?? "").map((key, index) => (
                          <div
                            key={`progress-${index}`}
                            className="flex flex-col gap-1"
                          >
                            <p className="w-32 text-medium font-semibold">
                              {key}
                            </p>
                            <ProgressBar
                              percentage={`${String(log.metric[key] * 20)}%`}
                              delay={index}
                              color={colors[index]}
                            />
                          </div>
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="sliders"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col"
                      >
                        {Object.keys(log.metric).map((key, index) => (
                          <div
                            key={`slider-${index}`}
                            className="flex flex-col"
                          >
                            <MySlider
                              size="md"
                              step={1}
                              maxValue={5}
                              label={key}
                              color={
                                colorOptions[index] as
                                  | "blue"
                                  | "purple"
                                  | "green"
                                  | "yellow"
                                  | "red"
                                  | undefined
                              }
                              defaultValue={log.metric[key]}
                              minValue={0}
                              showSteps={true}
                              onChange={(value) =>
                                handleSliderChange(key, Number(value))
                              }
                              classNames={{
                                base: "gap-0",
                                label: "text-medium font-semibold",
                              }}
                            />
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div>
                    <p className="text-lg font-semibold">Summary</p>
                    <AnimatePresence mode="wait" initial={false}>
                      {editMode ? (
                        <motion.div key={"text-area"}>
                          <Textarea
                            value={newSummary}
                            onChange={(e) => setNewSummary(e.target.value)}
                            placeholder="Write a brief description of your day"
                            size="lg"
                            minRows={4}
                          />
                        </motion.div>
                      ) : (
                        <ScrollShadow
                          key={"summary"}
                          className="max-h-[14rem]"
                          hideScrollBar
                        >
                          <p className="text-md font-medium">{log.summary}</p>
                        </ScrollShadow>
                      )}
                    </AnimatePresence>
                  </div>
                </ModalBody>
                {editMode && (
                  <ModalFooter className="pb-4 pt-0">
                    <AnimatePresence mode="wait">
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-row gap-2"
                      >
                        <Button
                          color="danger"
                          onPress={() => {
                            setEditMode(false);
                          }}
                        >
                          Cancel
                        </Button>
                        <Button color="success" onPress={handleSubmitEdit}>
                          Save
                        </Button>
                      </motion.div>
                    </AnimatePresence>
                  </ModalFooter>
                )}
              </>
            );
          }}
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
  // const [currentJourneyId, setCurrentJourneyId] = useState(journey_id);
  // const [logsToDisplay, setLogsToDisplay] = useState(logs);
  const [logsDisplayed, setLogsDisplayed] = useState(6); // Initial logs displayed
  const [logsToDisplay, setLogsToDisplay] = useState<any[]>([]); // Logs to display
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset logsDisplayed and logsToDisplay when journey_id changes
    setLogsDisplayed(6);
    setLogsToDisplay(logs?.slice(0, 6) || []);
  }, [journey_id, logs]);

  const handleLoadMore = () => {
    setLogsDisplayed((prev) => prev + 3);
    setLogsToDisplay(logs?.slice(0, logsDisplayed + 3) || []);
  };
  const handleAnimationStart = () => {
    setIsAnimating(true);
  };

  const handleAnimationComplete = () => {
    setIsAnimating(false);
  };
  useEffect(() => {
    if (!isAnimating) {
      setLogsToDisplay(logs?.slice(0, logsDisplayed) || []);
    }
  }, [logs, isAnimating]);
  return (
    <div>
      <div className="mb-4 flex flex-row items-center justify-between">
        <p
          onClick={() => setFunMode(!funMode)}
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
      <AnimatePresence
        initial={false}
        mode="wait"
        onExitComplete={handleAnimationComplete}
      >
        <motion.div
          // layoutId="logitemDisplay"
          key={journey_id}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.5 }}
          ref={containerRef}
          className="grid grid-cols-1 gap-4 will-change-transform md:grid-cols-2 lg:grid-cols-3"
          onAnimationStart={handleAnimationStart}
          style={{ willChange: "transform" }}
        >
          {logsToDisplay?.map((log) => (
            <LogItem
              key={log.id}
              log={log}
              containerRef={containerRef}
              funMode={funMode}
              journey_id={journey_id}
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
          transition={{ delay: 0.5 }}
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
