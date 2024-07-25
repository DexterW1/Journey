import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
export default function JourneyCards({ journey }: any) {
  return (
    <Card className="bg-primary p-2 text-white">
      <CardBody>
        <h1 className="text-neutral">{journey.title}</h1>
      </CardBody>
    </Card>
  );
}
