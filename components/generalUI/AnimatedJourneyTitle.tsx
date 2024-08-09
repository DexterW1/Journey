"use client";
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { IoIosFlag } from "react-icons/io";
export default function AnimatedJourneyTitle() {
  const controls = useAnimation();
  const flagControls = useAnimation();

  const letterVariants = {
    initial: { scale: 1 },
    animate: (i: number) => ({
      scale: [1, 1.5, 1],
      transition: {
        delay: i * 0.1,
        duration: 0.7,
        ease: "easeInOut",
      },
    }),
  };

  const flagVariants = {
    initial: { y: -100, opacity: 0 },
    animate: {
      y: 500,
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 1,
        type: "spring",
        stiffness: 50,
      },
    },
  };

  useEffect(() => {
    const animateSequence = async () => {
      await controls.start("animate");
      await flagControls.start("animate");
    };
    animateSequence();
  }, [controls, flagControls]);

  return (
    <div className="relative">
      <h1 className="mb-4 text-7xl font-extrabold text-primary xl:text-9xl">
        {"Journey".split("").map((letter, index) => (
          <motion.span
            key={index}
            custom={index}
            variants={letterVariants}
            initial="initial"
            animate={controls}
            className="mb-4 text-7xl font-extrabold text-primary xl:text-9xl"
            style={{ display: "inline-block" }}
          >
            {letter}
          </motion.span>
        ))}
      </h1>
      <motion.div
        className="absolute -top-8 right-0"
        variants={flagVariants}
        initial="initial"
        animate={flagControls}
      >
        <IoIosFlag className="h-12 w-12 text-red-500" />
      </motion.div>
    </div>
  );
}
