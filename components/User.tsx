import React from "react";
import { Avatar } from "@nextui-org/avatar";
import { useUserStore } from "@/store/userStore";
export default function User() {
  const user = useUserStore((state) => state.user);
  return (
    <div className="flex flex-row items-center gap-4">
      <Avatar
        src="images/avatar.png"
        size="sm"
        className="transition-transform"
      />
      {/* name/email container */}
      <div className="flex flex-col">
        <p className="font-bold">
          {(user as { first_name?: string }).first_name ?? "Temp-Username"}
        </p>
        <p className="text-sm text-gray-500">
          {(user as { email?: string }).email}
        </p>
      </div>
    </div>
  );
}
