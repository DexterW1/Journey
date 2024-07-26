import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
export default function JourneyCards({ journey, selected }: any) {
  return (
    <Card className="bg-primary p-2 transition-colors duration-1000 ease-in-out hover:bg-primaryLight">
      <CardBody>
        <h1 className="text-white">{journey.title}</h1>
      </CardBody>
    </Card>
  );
}
