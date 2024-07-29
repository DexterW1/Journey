import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Button } from "@nextui-org/react";
export default async function Index() {
  const supabase = createClient();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-8 sm:max-w-5xl">
      {/* Welcome Container */}
      <div className="flex flex-col items-center text-center md:pb-48">
        <h1 className="text-3xl">Welcome to</h1>
        <h1 className="mb-4 text-7xl text-primary xl:text-9xl">Journey</h1>
        <p className="md:text-md text-sm lg:text-lg">
          Discover a new way to track your personal growth with Journey. This
          simple tool helps you monitor and reflect on various aspects of your
          life. Whether you’re pursuing a goal, managing a new habit, or
          tracking daily experiences, Journey provides the insights you need to
          stay on track monitor your emotions.
        </p>
        <div className="mt-4">
          <Link href="/login">
            <Button className="bg-buttonPrimary" size="lg" radius="full">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
