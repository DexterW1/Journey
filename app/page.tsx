import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import AnimatedJourneyTitle from "@/components/generalUI/AnimatedJourneyTitle";
export default async function Index() {
  return (
    <div className="bg-lightBackground flex min-h-screen flex-col items-center justify-center px-8 sm:max-w-5xl">
      {/* Hero Section */}
      <div className="relative z-20 flex flex-col items-center text-center md:pb-48">
        <h1 className="text-3xl font-bold text-primary">Welcome to</h1>
        <h1 className="mb-4 text-7xl font-extrabold text-primary xl:text-9xl">
          <AnimatedJourneyTitle />
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
      <div className="absolute bottom-0 left-0 right-0 top-0 z-10">
        <svg
          id="visual"
          viewBox="0 0 900 600"
          className="fixed bottom-0 h-[750px] w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 485L82 454L164 489L245 453L327 485L409 525L491 464L573 524L655 444L736 492L818 480L900 508L900 601L818 601L736 601L655 601L573 601L491 601L409 601L327 601L245 601L164 601L82 601L0 601Z"
            fill="#337E26"
          />
        </svg>
        <svg
          id="visual"
          viewBox="0 0 900 600"
          className="fixed bottom-0 h-[750px] w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 510L82 493L164 504L245 544L327 531L409 506L491 530L573 476L655 506L736 484L818 474L900 496L900 601L818 601L736 601L655 601L573 601L491 601L409 601L327 601L245 601L164 601L82 601L0 601Z"
            fill="#2F6E24"
          />
        </svg>
        <svg
          id="visual"
          viewBox="0 0 900 600"
          className="fixed bottom-0 h-[750px] w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 558L82 565L164 543L245 518L327 567L409 541L491 557L573 554L655 562L736 563L818 518L900 505L900 601L818 601L736 601L655 601L573 601L491 601L409 601L327 601L245 601L164 601L82 601L0 601Z"
            fill="#2A5F22"
          />
        </svg>
        <svg
          id="visual"
          viewBox="0 0 900 600"
          className="fixed bottom-0 h-[750px] w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 555L82 548L164 550L245 585L327 547L409 550L491 550L573 544L655 568L736 553L818 558L900 583L900 601L818 601L736 601L655 601L573 601L491 601L409 601L327 601L245 601L164 601L82 601L0 601Z"
            fill="#265020"
          />
        </svg>
      </div>
    </div>
  );
}
