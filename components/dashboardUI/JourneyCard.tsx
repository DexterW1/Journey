import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
export default function JourneyCards({ journey, selected }: any) {
  return (
    <Card className="p-2` bg-primary">
      <CardBody>
        <h1 className="text-white">{journey.title}</h1>
      </CardBody>
    </Card>
  );
}
