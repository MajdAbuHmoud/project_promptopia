"use client";

import Feed from "@components/Feed";
import tw from "twin.macro";
import { motion } from "framer-motion";

// initial={{
//   top: "50%",
//   y: "-50%",
// }}
// animate={{
//   top: 0,
//   y: 0,
// }}
// transition={{
//   duration: 1,
// }}

const test = tw`text-6xl`;

console.log("🚀 ~ file: page.tsx:21 ~ test:", test);

// const fontSizeVariants = {
//   initial: { test },
//   final: {
//     test2,
//     transition: {
//       delay: 5,
//       duration: 1,
//     },
//   },
// };

const parentOpacityVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 1,
    },
  },
};

const opacityVariants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <div className="flex justify-center w-full h-screen relative">
        <motion.div className="flex flex-col text-center absolute top-1/2 transform -translate-y-1/2">
          <motion.div
            variants={parentOpacityVariants}
            initial="hidden"
            animate="show"
            className="flex head_text flex-wrap justify-center space-x-3"
          >
            <motion.h1 variants={opacityVariants}>Discover</motion.h1>
            <motion.h1 variants={opacityVariants}>&</motion.h1>
            <motion.h1 variants={opacityVariants}>Share</motion.h1>
            <motion.span
              variants={opacityVariants}
              className="w-full block mt-3 purple_gradient text-center"
            >
              AI-Powered Prompts
            </motion.span>
          </motion.div>
        </motion.div>
      </div>

      {/* <p className="desc text-center">
        Promptopia is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts
      </p> */}
      {/* <Feed /> */}
    </section>
  );
}

export default Home;
