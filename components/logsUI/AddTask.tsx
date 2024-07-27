"use client";
import React from "react";
import { Slider, Input, Textarea, Button } from "@nextui-org/react";
export default function AddTask({ journey }: any) {
  return (
    <div className="">
      <div className="flex flex-col">
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
