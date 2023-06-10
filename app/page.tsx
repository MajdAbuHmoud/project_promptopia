"use client";

import Feed from "@components/Feed";
import Passage from "@passageidentity/passage-node";
import { useEffect } from "react";
// import { GetServerSideProps, GetServerSidePropsContext } from "next";

function Home() {
  useEffect(() => {
    const temp = async () => {
      console.log("hello");
      await getinfo();
    };

    console.log(temp());
  }, []);

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-mid:hidden" />
        <span className="purple_gradient text-center">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Promptopia is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts
      </p>
      <Feed />
    </section>
  );
}

export const getinfo = async () => {
  const response = await fetch("/api/auth/passageAuth");
  console.log("🚀 ~ file: page.tsx:36 ~ getinfo ~ response:", response);
  const data = response.json();

  return data;
};

export default Home;
