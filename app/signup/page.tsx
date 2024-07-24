import React from "react";
import Link from "next/link";
import { SubmitButton } from "../login/submit-button";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const signUp = async (formData: FormData) => {
  "use server";

  const email = formData.get("email") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { data: user, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.log(error);
    return redirect("/signup?message=Could not authenticate user");
  }
  if (user) {
    const { error } = await supabase.from("users").insert([
      {
        id: user.user?.id,
        email,
        first_name: firstName,
        last_name: lastName,
      },
    ]);
    if (error) {
      console.log(error);
      return redirect("/signup?message=Could not create user");
    }
  }
  return redirect("/home");
};
export default function page() {
  return (
    <div className="flex w-full flex-1 flex-col items-center gap-8 px-8 pt-8 sm:max-w-5xl">
      <Link href={"/login"} className="bg-accent self-start rounded-xl p-2">
        Back
      </Link>
      <form className="mb-32 flex w-full flex-1 flex-col justify-center gap-2 text-foreground sm:max-w-md">
        {/* Name Container */}
        <div className="flex flex-row gap-4">
          <div className="flex flex-1 flex-col">
            <label className="text-md text-neutral" htmlFor="firstName">
              First Name
            </label>
            <input
              className="text-neutral mb-6 w-full rounded-md border border-secondary bg-inherit px-4 py-2"
              name="firstName"
              placeholder="John"
              required
            />
          </div>
          <div className="flex flex-1 flex-col">
            <label className="text-neutral text-md" htmlFor="lastName">
              Last Name
            </label>
            <input
              className="text-neutral mb-6 w-full rounded-md border border-secondary bg-inherit px-4 py-2"
              name="lastName"
              placeholder="Doe"
              required
            />
          </div>
        </div>
        <label className="text-md text-neutral" htmlFor="email">
          Email
        </label>
        <input
          className="text-neutral mb-6 rounded-md border border-secondary bg-inherit px-4 py-2"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md text-neutral" htmlFor="password">
          Password
        </label>
        <input
          className="text-neutral mb-6 rounded-md border border-secondary bg-inherit px-4 py-2"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <SubmitButton
          formAction={signUp}
          className="mb-2 rounded-md bg-primary px-4 py-2 text-foreground"
          pendingText="Signing In..."
        >
          Sign Up
        </SubmitButton>
        {/*       
      {searchParams?.message && (
        <p className="mt-4 bg-foreground/10 p-4 text-center text-foreground">
          {searchParams.message}
        </p>
      )} */}
      </form>
    </div>
  );
}
