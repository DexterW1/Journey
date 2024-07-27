"use client";
import React, { useState, useEffect } from "react";
import {
  Slider,
  Input,
  Textarea,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";
import EmojiPicker from "emoji-picker-react";
import { useUserStore } from "@/store/userStore";
import { useLogStore } from "@/store/logStore";
import { IoTimeOutline } from "react-icons/io5";
const timeReturn = () => {
  const date = new Date();
  const hour = date.getHours();
  let timeOfDay = "";

  if (hour >= 5 && hour < 12) {
    timeOfDay = "morning";
  } else if (hour >= 12 && hour < 18) {
    timeOfDay = "evening";
  } else {
    timeOfDay = "night";
  }
  return timeOfDay;
};
export default function AddTask({ journey }: any) {
  const [open, setOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  const addLog = useLogStore((state) => state.addLog);
  const [sliderValues, setSliderValues] = useState<any>({});
  const [emoji, setEmoji] = useState("");
  const [summary, setSummary] = useState("");
  const [time, setTime] = useState("");
  const handleEmojiClicked = (e: any) => {
    setEmoji(e.emoji);
    setOpen(false);
  };
  const handleCreateLog = async () => {
    // create log
    const result = {
      time_day: time,
      emoji: emoji,
      journey_id: journey.id,
      user_id: user.id,
      summary,
      metric: sliderValues,
    };
    addLog(result, journey.id);
  };
  const handleSliderChange = (label: string, value: number) => {
    console.log(time);
    setSliderValues((prevValues: any) => ({
      ...prevValues,
      [label]: value,
    }));
  };
  useEffect(() => {
    if (journey.template != null) {
      const initialValues = journey.template.reduce((acc: any, task: any) => {
        acc[task] = 0;
        return acc;
      }, {});
      setSliderValues(initialValues);
    }
  }, [journey]);
  return (
    <div className="flex flex-col gap-2 py-1 md:px-4">
      <p className="font-serif text-xl font-semibold">
        How are we feeling today?
      </p>
      <div className="flex flex-col md:flex-row">
        {/* selectcontainer */}
        <div className="flex flex-1 flex-col">
          <div className="flex flex-row gap-4 md:gap-6 md:pr-8">
            <Select
              defaultSelectedKeys={[timeReturn()]}
              onChange={(e) => setTime(e.target.value)}
              className="order-2 flex-1 self-start text-primary"
              classNames={{ value: "text-primary" }}
              aria-label="Time of day select"
              startContent={<IoTimeOutline size={25} />}
            >
              <SelectItem key="morning" value="morning">
                Morning
              </SelectItem>
              <SelectItem key="evening" value="evening">
                Evening
              </SelectItem>
              <SelectItem key="night" value="night">
                Night
              </SelectItem>
            </Select>
            <div
              className="order-1 flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-xl bg-primary transition-colors duration-500 ease-in-out hover:bg-primaryLight"
              onClick={() => setOpen(!open)}
            >
              <div className="flex h-16 w-16 flex-col items-center justify-center rounded-full bg-cardContentBackground">
                {emoji ? (
                  <p className="text-4xl text-textPrimary">{emoji}</p>
                ) : (
                  <p className="text-4xl text-textPrimary">+</p>
                )}
              </div>
            </div>
            <div className="absolute top-0 z-50">
              <EmojiPicker
                open={open}
                onEmojiClick={(e) => handleEmojiClicked(e)}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          {journey.template != null &&
            journey.template.map((task: any) => (
              <Slider
                size="md"
                step={1}
                label={task}
                maxValue={5}
                minValue={0}
                showSteps={true}
                onChange={(value) => handleSliderChange(task, Number(value))}
                classNames={{
                  filler: "bg-gradient-to-r from-primaryLight to-secondary  ",
                  track: "border-s-primaryLight bg-cardContentBackground",
                  label: "text-textPrimary font-bold text-md",
                  value: "text-textPrimary font-bold text-md",
                }}
              />
            ))}
        </div>
      </div>
      <Textarea
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        placeholder="Optional summary"
        style={{ height: "10rem" }}
        size="lg"
      />
      <Button
        className="bg-gradient-to-r from-buttonPrimary to-buttonSecondary"
        onPress={handleCreateLog}
      >
        <p className="text-lg text-textEmphasis">Add log</p>
      </Button>
    </div>
  );
}
