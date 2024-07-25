import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
export default function JourneyCards({ journey }: any) {
  return (
    <Card className="bg-primary p-2">
      <CardBody>
        <h1 className="text-white">{journey.title}</h1>
      </CardBody>
    </Card>
  );
}
