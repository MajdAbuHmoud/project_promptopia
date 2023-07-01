"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import { PostWithCreatorType } from "@types";
import { AnimatePresence, motion } from "framer-motion";
import {
  parentOpacityVariants,
  postsVariants,
  searchTextVariants,
} from "@utils/framerMotion/variants";

function Feed() {
  // Search bar
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<PostWithCreatorType[]>([]);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();
  const [displayPosts, setDisplayPosts] = useState<boolean>(false);

  const [posts, setPosts] = useState<PostWithCreatorType[]>([]);

  const filterPrompts = (searchText: string) => {
    // more complex search
    // const searchRegex = new RegExp(
    //   `((?:\\b${searchText}\\b)|(?:#${searchText})|(?:@${searchText}))`,
    //   "i"
    // );

    const searchRegex = new RegExp(searchText, "i");

    return posts.filter((post) => {
      return (
        searchRegex.test(post.creator.username) ||
        searchRegex.test(post.prompt) ||
        searchRegex.test(post.tag)
      );
    });
  };

  const handleSearchTextChange = (textToSearch: string) => {
    clearTimeout(searchTimeout);
    setSearchText(textToSearch);

    setSearchTimeout(
      setTimeout(() => {
        const filterResult = filterPrompts(textToSearch);
        console.log(
          "🚀 ~ file: Feed.tsx:47 ~ setTimeout ~ filterResult:",
          filterResult
        );
        setSearchResults(filterResult);
      }, 500)
    );
  };

  const handleTagClick = (tag: string) => {
    handleSearchTextChange(tag);
  };

  useEffect(() => {
    const getPrompts = async () => {
      const getPromptsData = await fetch("/api/prompt");
      const promptsData = await getPromptsData.json();
      setPosts(promptsData);
    };
    getPrompts();
  }, []);

  return (
    <section className="feed">
      <motion.form
        variants={searchTextVariants}
        initial="hidden"
        animate="show"
        className="relative w-full max-w-xl flex-center"
        onAnimationComplete={() => setDisplayPosts(true)}
      >
        <input
          className="search_input_dark peer"
          placeholder="Search for a tag or username"
          type="text"
          value={searchText}
          onChange={(e) => handleSearchTextChange(e.target.value)}
        />
      </motion.form>
      <AnimatePresence>
        {posts.length && displayPosts ? (
          <motion.div
            variants={parentOpacityVariants}
            initial="hidden"
            animate="show"
            className="mt-16 prompt_layout"
          >
            {(searchText ? searchResults : posts).map((post) => {
              return (
                <motion.div variants={postsVariants} key={post._id}>
                  <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

export default Feed;
