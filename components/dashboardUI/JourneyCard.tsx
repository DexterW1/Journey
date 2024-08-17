import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
  cn,
  Button,
} from "@nextui-org/react";
import { EditDocumentIcon } from "../icon/EditDocumentIcon";
import { useJourneyStore } from "@/store/journeyStore";
import { FaCheck } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import { DeleteDocumentIcon } from "../icon/DeleteDocument";
import { HiDotsVertical } from "react-icons/hi";
const iconClasses =
  "text-xl text-default-500 pointer-events-none flex-shrink-0";

export default function JourneyCards({
  journey,
  selected,
  setEditJourneyMode,
}: any) {
  const [isRotated, setIsRotated] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [deleteCheck, setDeleteCheck] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const deleteJourney = useJourneyStore((state) => state.deleteJourney);
  const handleEditJourney = () => {
    setEditJourneyMode(true);
    setEditMode(true);
  };
  const handleEditCancel = () => {
    setEditMode(false);
    setEditJourneyMode(false);
  };
  // const handleDeleteCheck = () => {
  //   setDeleteCheck(true);
  // };
  const handleDeleteJourney = () => {
    // if (deleteCheck) {
    deleteJourney(journey.id);
    // }
  };
  const handleDropdownOpenChange = (open: any) => {
    setIsDropdownOpen(open);
    if (!open) {
      setIsRotated(false);
    }
  };
  return (
    <Card className="bg-primary p-1 transition-colors duration-1000 ease-in-out hover:bg-primaryLight">
      <CardBody>
        <div className="flex flex-row items-center justify-between">
          {editMode ? (
            <input
              placeholder={journey.title}
              style={{ color: "white" }}
              className="bg-transparent text-white"
            />
          ) : (
            <h1 className="text-white">{journey.title}</h1>
          )}

          <div
            className="flex items-center justify-center transition-opacity duration-500 ease-in-out"
            style={{ opacity: selected ? 0 : 1 }}
          >
            {editMode && (
              <div className="flex flex-row space-x-2">
                <button>
                  <FaCheck size={24} fill="blue" />
                </button>
                <button onClick={handleEditCancel}>
                  <IoCloseOutline size={24} />
                </button>
              </div>
            )}
            <Dropdown onOpenChange={handleDropdownOpenChange}>
              <DropdownTrigger>
                <button
                  className="outline-none"
                  onMouseEnter={() => setIsRotated(true)}
                  onMouseLeave={() => !isDropdownOpen && setIsRotated(false)}
                >
                  <HiDotsVertical
                    fill="white"
                    className="text-xl transition-transform duration-300"
                    style={{
                      transform: isRotated ? "rotate(90deg)" : "rotate(0)",
                    }}
                  />
                </button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key="edit"
                  onPress={handleEditJourney}
                  startContent={<EditDocumentIcon className={iconClasses} />}
                >
                  Edit log
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  onPress={handleDeleteJourney}
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
      </CardBody>
    </Card>
  );
}
