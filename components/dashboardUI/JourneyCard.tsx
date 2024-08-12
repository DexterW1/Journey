import React, { useState } from "react";
import {
  Card,
  CardBody,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
  cn,
} from "@nextui-org/react";
import { EditDocumentIcon } from "../icon/EditDocumentIcon";
import { useJourneyStore } from "@/store/journeyStore";
import { DeleteDocumentIcon } from "../icon/DeleteDocument";
import { HiDotsVertical } from "react-icons/hi";
const iconClasses =
  "text-xl text-default-500 pointer-events-none flex-shrink-0";

export default function JourneyCards({ journey, selected }: any) {
  const [deleteCheck, setDeleteCheck] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const deleteJourney = useJourneyStore((state) => state.deleteJourney);
  const handleEditJourney = () => {};
  const handleDeleteCheck = () => {
    setDeleteCheck(true);
  };
  const handleDeleteJourney = () => {
    if (deleteCheck) {
      deleteJourney(journey.id);
    }
  };
  return (
    <Card className="bg-primary p-1 transition-colors duration-1000 ease-in-out hover:bg-primaryLight">
      <CardBody>
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-white">{journey.title}</h1>
          <div
            className="flex items-center justify-center transition-opacity duration-500 ease-in-out"
            style={{ opacity: selected ? 0 : 1 }}
          >
            <Dropdown>
              <DropdownTrigger>
                <button>
                  <HiDotsVertical size={20} fill="white" />
                </button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key="edit"
                  onPress={() => setEditMode(true)}
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
          {/* )} */}
        </div>
      </CardBody>
    </Card>
  );
}
