import React, { useState, useEffect } from "react";
import { useUserStore } from "@/store/userStore";

export default function GreetingCard() {
  const user = useUserStore((state) => state.user);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      // Extract hours and minutes for 24-hour format
      let hours = now.getHours();
      let minutes = now.getMinutes();
      const formattedDay = now.toLocaleDateString("en-US", { weekday: "long" });
      console.log(formattedDay);
      // Format hours and minutes without leading zeros
      const formattedTime = `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
      setDay(formattedDay);
      setDate(formattedDate);
      setTime(formattedTime);
    };

    // Update date and time immediately
    updateDateTime();

    // Set up an interval to update time every minute
    const intervalId = setInterval(updateDateTime, 60000); // 60000 ms = 1 minute

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col rounded-xl bg-cardBackground px-4 py-2 sm:w-full">
      <div className="flex flex-row items-center">
        <p className="text-lg">
          Good {new Date().getHours() < 12 ? "Morning" : "Evening"},{" "}
          {user.first_name}
        </p>
      </div>
      <div className="flex flex-row items-center">
        <p className="text-xl">{day}</p>
        <p className="ml-2 text-lg">{date}</p>
        <p className="ml-2 text-lg">|</p>
        <p className="ml-2 text-lg">{time}</p>
      </div>
    </div>
  );
}
