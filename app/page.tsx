import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Button } from "@nextui-org/react";
export default async function Index() {
  // const supabase = createClient();

  return (
    <div className="bg-lightBackground flex min-h-screen flex-col items-center justify-center px-8 sm:max-w-5xl">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center md:pb-48">
        <h1 className="text-3xl font-bold text-primary">Welcome to</h1>
        <h1 className="mb-4 text-7xl font-extrabold text-primary xl:text-9xl">
          Journey
        </h1>
        <p className="md:text-md text-sm leading-relaxed lg:text-lg">
          Discover a new way to track your personal growth with Journey. This
          simple tool helps you monitor and reflect on various aspects of your
          life. Whether you’re pursuing a goal, managing a new habit, or
          tracking daily experiences, Journey provides the insights you need to
          stay on track and monitor your emotions.
        </p>
        <div className="mt-6 flex flex-col items-center">
          <Link href="/login">
            <Button
              className="hover:bg-buttonPrimaryHover bg-buttonPrimary text-white transition duration-300"
              size="lg"
              radius="full"
            >
              <p>Get Started</p>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
