"use client";
import React, { useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { IoIosFlag } from "react-icons/io";
export default function AnimatedJourneyTitle() {
  const controls = useAnimation();
  const flagControls = useAnimation();

  const letterVariants = {
    initial: { opacity: 0, x: -20 },
    animate: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.04,
        duration: 0.6,
      },
    }),
  };

  const flagVariants = {
    initial: { y: -100, opacity: 0 },
    animate: {
      y: 500,
      rotate: 15,
      opacity: 1,
      transition: {
        delay: 0.3,
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
    <div className="">
      <h1 className="mb-4 text-7xl font-extrabold text-primary xl:text-9xl">
        {/* Journey */}
        <AnimatePresence>
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
        </AnimatePresence>
      </h1>
      <motion.div
        className="absolute right-0 top-2"
        variants={flagVariants}
        initial="initial"
        animate={flagControls}
      >
        <IoIosFlag className="h-12 w-12 text-red-500" fill="red" stroke="red" />
      </motion.div>
    </div>
  );
}
