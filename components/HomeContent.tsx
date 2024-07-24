"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import GetStarted from "@/screens/GetStarted";
import { useUserStore } from "@/store/userStore";
import NavBar from "./NavBar";
export default function HomeContent() {
  const fetchUser = useUserStore((state) => state.fetchUser);
  const user = useUserStore((state) => state.user);
  const fetchedUser = useUserStore((state) => state.fetchedUser);
  useEffect(() => {
    if (!fetchedUser) {
      fetchUser();
    }
  }, [fetchedUser]);
  if (!user) return <div>Loading...</div>;

  return (
    <div className="flex w-full flex-1 flex-col sm:max-w-6xl">
      <NavBar />

      <GetStarted user={user} />
    </div>
  );
}
// <div className="flex w-full flex-1 flex-col px-4 pt-8"></div>;
