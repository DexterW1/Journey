"use client";
import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import User from "./User";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { CiUser } from "react-icons/ci";
import { TbHelp } from "react-icons/tb";
import { CiSettings } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
export default function NavBar() {
  const router = useRouter();
  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };
  return (
    <div className="sticky flex flex-row items-center justify-between p-4">
      <div className="self-center">
        <h1 className="text-4xl text-primary">Journey</h1>
      </div>
      <div className="self-end">
        <Dropdown>
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              size="sm"
              src="images/avatar.png"
            />
          </DropdownTrigger>
          <DropdownMenu
            disabledKeys={["user"]}
            variant="faded"
            aria-label="Dropdown menu with icons"
          >
            <DropdownItem className="opacity-100" key="user">
              <User />
            </DropdownItem>
            <DropdownItem key="profile" startContent={<CiUser />}>
              Profile
            </DropdownItem>
            <DropdownItem
              showDivider
              key="settings"
              startContent={<CiSettings />}
            >
              Settings
            </DropdownItem>
            <DropdownItem key="help" startContent={<TbHelp />}>
              Help Center
            </DropdownItem>
            <DropdownItem
              onPress={signOut}
              key="logout"
              startContent={<CiLogout />}
            >
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}
