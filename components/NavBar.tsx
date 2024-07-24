"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Avatar,
} from "@nextui-org/react";
import { useUserStore } from "@/store/userStore";
import SignoutButton from "./SignoutButton";
export default function NavBar() {
  return (
    <Navbar position="static" className="justify-between">
      <NavbarItem>
        <p className="text-4xl text-primary">Journey</p>
      </NavbarItem>
      <NavbarItem>
        <SignoutButton />
      </NavbarItem>
    </Navbar>
  );
}
