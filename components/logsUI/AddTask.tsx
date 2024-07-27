"use client";
import React from "react";
import { Slider, Input } from "@nextui-org/react";
export default function AddTask({ journey }: any) {
  return (
    <div className="">
      <div className="flex flex-col gap-2">
        {journey.template != null &&
          journey.template.map((task: any) => (
            <Slider
              size="md"
              step={1}
              label={task}
              maxValue={5}
              minValue={0}
              defaultValue={0}
              classNames={{}}
            />
          ))}
      </div>
      <Input
        placeholder="Task Name"
        variant="underlined"
        classNames={{
          inputWrapper:
            "after:bg-accent hover:border-primaryLight border-primary",
        }}
      />
    </div>
  );
}
