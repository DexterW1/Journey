"use client";
import React from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
export default function SignoutButton() {
  const router = useRouter();
  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };
  return <Button onPress={signOut}>Sign Out</Button>;
}
