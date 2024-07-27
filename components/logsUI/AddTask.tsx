"use client";
import React, { useState } from "react";
import {
  Slider,
  Input,
  Textarea,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";
import EmojiPicker from "emoji-picker-react";
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
  const [emoji, setEmoji] = useState("");
  const handleEmojiClicked = (e: any) => {
    setEmoji(e.emoji);
    setOpen(false);
  };
  return (
    <div className="flex flex-col gap-2">
      <p className="font-serif text-xl font-semibold">
        How are we feeling today?
      </p>
      <div className="flex flex-col lg:flex-row">
        {/* selectcontainer */}
        <div className="flex flex-1 flex-row border">
          <Select
            defaultSelectedKeys={[timeReturn()]}
            className="order-2 w-[10rem] self-start border text-primary"
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
              emojiStyle="apple"
              onEmojiClick={(e) => handleEmojiClicked(e)}
            />
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
        placeholder="Optional summary"
        // variant="underlined"
        classNames={{
          inputWrapper:
            "after:bg-accent hover:border-primaryLight border-primary",
        }}
      />
      <Button>Add Log</Button>
    </div>
  );
}
