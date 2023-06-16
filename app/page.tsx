"use client";

// import Feed from "@components/Feed";
import { motion } from "framer-motion";
// import tw from "twin.macro";

const positionVariants = {
  initial: {
    top: "50%",
    y: "-50%",
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

// const test = tw`text-6xl`;
// const test2 = tw`text-5xl`;
// console.log("🚀 ~ file: page.tsx:66 ~ test:", test);

const parentVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 1,
    },
  },
};

// fontInitial: { fontSize: test.fontSize as string },
// fontFinal: {
//   fontSize: test2.fontSize as string,
//   transition: {
//     delay: 5,
//     duration: 1,
//     ease: "easeInOut",
//   },
// },

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

// initial={["hidden", "fontInitial"]}
// animate={["show", "fontFinal"]}

function Home() {
  return (
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
            variants={parentVariants}
            initial={"hidden"}
            animate={"show"}
            className="flex head_text flex-wrap justify-center space-x-3"
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
  );
}

export default Home;
