"use client";

import React, { useEffect, useState } from "react";
import { getAverage } from "@/utils/helperfunctions/helpers";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  cn,
} from "@nextui-org/react";
import { DeleteDocumentIcon } from "@/components/icon/DeleteDocument";
import { EditDocumentIcon } from "@/components/icon/EditDocumentIcon";
import GraphAverage from "./GraphAverage";
const iconClasses =
  "text-xl text-default-500 pointer-events-none flex-shrink-0";
export default function OverallStats({ journey, logs }: any) {
  return (
    <div className="relative flex flex-col items-center">
      <div className="flex flex-row justify-center">
        <FaQuoteLeft className="text-md mr-2" fill="white" />
        <p className="font-serif text-xl font-extrabold text-white md:text-3xl">
          {journey.title}
        </p>
        <FaQuoteRight className="text-md ml-2" fill="white" />
        {/* Edit Journey Container Icon */}
        <div className="absolute right-2">
          <Dropdown>
            <DropdownTrigger>
              <button>
                <HiDotsVertical size={25} fill="white" />
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
                // className="text-danger"
                color="danger"
                onPress={() => {}}
                classNames={{
                  description: "text-white",
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
      <div className="">
        <GraphAverage />
      </div>
    </div>
  );
}
