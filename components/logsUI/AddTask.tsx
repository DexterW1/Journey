"use client";
import React from "react";
import { ButtonGroup, Button, Input } from "@nextui-org/react";
export default function AddTask() {
  return (
    <div className="">
      <div></div>
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
