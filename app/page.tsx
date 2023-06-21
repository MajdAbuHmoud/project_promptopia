"use client";

import {
  introTextVariants,
  introTextLetterVariants,
  opacityVariants,
  parentOpacityVariants,
} from "@utils/framerMotion/variants";
import { useMediaQuery } from "@utils/hooks/useMediaQuery";
import { useResizeOnce } from "@utils/hooks/useResizeOnce";
import Feed from "@components/Feed";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useStore } from "@utils/store/store";
import { StoreInitializer } from "@components/StoreInitializer";

const positionVariants = {
  initial: {
    top: "50%",
    y: "-50%",
  },
  final: {
    top: 0,
    y: 0,
    transition: {
      delay: 3,
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

const parentVariants = (hasResized: boolean, isMedium: boolean) => {
  return {
    ...parentOpacityVariants,
    fontInitial: isMedium ? { fontSize: "5rem" } : { fontSize: "3rem" },
    fontFinal: {
      fontSize: isMedium ? "3rem" : "2rem",
      transition: {
        delay: hasResized ? 0 : 3,
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };
};

function Home() {
  const hasResized = useResizeOnce();
  const { userInfo, getUserInfo } = useStore();
  useEffect(() => {
    if (!userInfo) {
      console.log("🚀 ~ file: page.tsx:53 ~ useEffect ~ userInfo:", userInfo);
      getUserInfo();
    }
  }, [getUserInfo, userInfo]);

  const [isMounted, setIsMounted] = useState(false);
  const isMedium = useMediaQuery("(min-width: 768px)");

  const introText =
    "Promptopia is an open-source AI prompting tool for modern world to discover, create and share creative prompts";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? (
    <section className="w-full h-full flex flex-col relative items-center">
      <StoreInitializer userInfo={userInfo} />
      <motion.div
        variants={positionVariants}
        initial="initial"
        animate="final"
        className="flex flex-col items-center text-center absolute"
      >
        <motion.div
          variants={parentVariants(hasResized, isMedium)}
          initial={["hidden", "fontInitial"]}
          animate={["show", "fontFinal"]}
          className="flex font-monaSans font-extrabold leading-[1.15] text-white flex-wrap justify-center space-x-3"
        >
          <motion.h1 variants={opacityVariants}>Discover</motion.h1>
          <motion.h1 variants={opacityVariants}>&</motion.h1>
          <motion.h1 variants={opacityVariants}>Share</motion.h1>
          <motion.span
            variants={opacityVariants}
            className="w-full block mt-2 github-purple-gradient text-center"
          >
            AI-Powered Prompts
          </motion.span>
        </motion.div>
        <motion.p
          variants={introTextVariants}
          initial="hidden"
          animate="show"
          className="desc text-center font-monaSans"
        >
          {introText.split("").map((char, index) => {
            return (
              <motion.span
                key={char + "-" + index}
                variants={introTextLetterVariants}
              >
                {char}
              </motion.span>
            );
          })}
        </motion.p>
        <Feed />
      </motion.div>
    </section>
  ) : null;
}

export default Home;
