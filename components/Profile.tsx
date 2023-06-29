"use client";

import { PostWithCreatorType } from "@types";
import PromptCard from "./PromptCard";
import { AnimatePresence, motion } from "framer-motion";
import {
  parentOpacityVariants,
  postsVariants,
} from "@utils/framerMotion/variants";
import { useSession } from "next-auth/react";
import { useStore } from "@utils/store/store";
import { useRouter } from "next/navigation";

type ProfileProps = {
  name: string;
  desc: string;
  posts: PostWithCreatorType[];
  handleEditClick?: (post: PostWithCreatorType) => void;
  handleDeleteClick?: (post: PostWithCreatorType) => void;
  handleTagClick?: (tag: string) => void;
};

function Profile({
  name,
  desc,
  posts,
  handleEditClick,
  handleDeleteClick,
  handleTagClick,
}: ProfileProps) {
  const router = useRouter();
  const { userInfo } = useStore();
  const { data: session, status } = useSession();

  if (status === "unauthenticated" && !userInfo?.isAuthorized) {
    router.push("/auth/signIn");
  }

  return status === "authenticated" || userInfo?.isAuthorized ? (
    <section className="w-full">
      <h1 className="head_text">
        <span className="purple_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <AnimatePresence>
        {posts.length ? (
          <motion.div
            variants={parentOpacityVariants}
            initial="hidden"
            animate="show"
            className="mt-16 prompt_layout"
          >
            {posts.map((post) => {
              return (
                <motion.div variants={postsVariants} key={post._id}>
                  <PromptCard
                    key={post._id}
                    post={post}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                    handleTagClick={handleTagClick}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  ) : null;
}

export default Profile;
