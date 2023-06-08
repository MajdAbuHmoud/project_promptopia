"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

function Feed() {
  // Search bar
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<PostWithCreatorType[]>([]);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();

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
          "🚀 ~ file: Feed.tsx:40 ~ setTimeout ~ filterResult:",
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
      console.log(
        "🚀 ~ file: Feed.tsx:13 ~ getPrompts ~ promptsData:",
        promptsData
      );
      setPosts(promptsData);
    };
    getPrompts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full max-w-xl flex-center">
        <input
          className="search_input peer"
          placeholder="Search for a tag or username"
          type="text"
          value={searchText}
          onChange={(e) => handleSearchTextChange(e.target.value)}
        />
      </form>
      <div className="mt-16 prompt_layout">
        {(searchText ? searchResults : posts).map((post) => {
          return (
            <PromptCard
              key={post._id}
              post={post}
              handleTagClick={handleTagClick}
            />
          );
        })}
      </div>
    </section>
  );
}

export default Feed;
