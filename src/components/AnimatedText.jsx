import React from "react";
import { motion } from "framer-motion";

const quote = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.08,
    },
  },
};

const singleWorld = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
};

export default function AnimatedText({ text, className = "" }) {
  return (
    <div className='w-full mx-auto py-2 flex items-center justify-center text-center overflow-hidden sm:py-0'>
      <motion.h1
        className={`inline-block w-full text-dark font-bold capitalize  ${className}`}
        variants={quote}
        initial='initial'
        animate='animate'>
        {text.split(" ").map((word, index) => (
          <motion.span
            variants={singleWorld}
            key={word + "-" + index}
            className='inline-block'>
            {word} &nbsp;
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
}
