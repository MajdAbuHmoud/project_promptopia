"use client";

import { opacityVariants } from "@utils/framerMotion/variants";
import { useMediaQuery } from "@utils/hooks/useMediaQuery";
import { useResizeOnce } from "@utils/hooks/useResizeOnce";
// import Feed from "@components/Feed";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const positionVariants = {
  initial: {
    top: "40%",
    y: "-40%",
  },
  final: {
    top: 0,
    y: 0,
    transition: {
      delay: 5,
      duration: 1,
      ease: "easeInOut",
    },
  },
};

const parentVariants = (hasResized: boolean, isMedium: boolean) => {
  console.log("🚀 ~ file: page.tsx:25 ~ parentVariants ~ isMedium:", isMedium);

  return {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 1,
      },
    },
    fontInitial: isMedium ? { fontSize: "5rem" } : { fontSize: "3rem" },
    fontFinal: {
      fontSize: isMedium ? "3rem" : "2rem",
      transition: {
        delay: hasResized ? 0 : 5,
        duration: 1,
        ease: "easeInOut",
      },
    },
  };
};

function Home() {
  const hasResized = useResizeOnce();
  const [isMounted, setIsMounted] = useState(false);
  const isMedium = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? (
    <section className="w-full flex-center flex-col">
      <motion.div
        initial={{ height: "100vh" }}
        className="flex justify-center w-full relative"
      >
        <motion.div
          variants={positionVariants}
          initial="initial"
          animate="final"
          className="flex flex-col text-center absolute"
        >
          <motion.div
            variants={parentVariants(hasResized, isMedium)}
            initial={["hidden", "fontInitial"]}
            animate={["show", "fontFinal"]}
            className="flex font-extrabold leading-[1.15] text-black flex-wrap justify-center space-x-3"
          >
            <motion.h1 variants={opacityVariants}>Discover</motion.h1>
            <motion.h1 variants={opacityVariants}>&</motion.h1>
            <motion.h1 variants={opacityVariants}>Share</motion.h1>
            <motion.span
              variants={opacityVariants}
              className="w-full block mt-2 purple_gradient text-center"
            >
              AI-Powered Prompts
            </motion.span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* <p className="desc text-center">
        Promptopia is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts
      </p> */}
      {/* <Feed /> */}
    </section>
  ) : null;
}

export default Home;
