"use client";

import Profile from "@components/Profile";
import { SessionModified } from "@interfaces/interfaces";
import { PostWithCreatorType } from "@types";
import { useStore } from "@utils/store/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function MyProfile() {
  const router = useRouter();
  const { userInfo } = useStore();
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState<PostWithCreatorType[]>([]);

  if (status === "unauthenticated" && !userInfo?.isAuthorized) {
    router.push("/");
  }

  const handleEdit = (post: PostWithCreatorType) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post: PostWithCreatorType) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/prompt/${post._id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setPosts((prevPosts) => {
            return prevPosts.filter((prevPost) => prevPost._id !== post._id);
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const getMyProfilePosts = async () => {
      const getMyProfilePostsData = await fetch(
        `/api/users/${
          (session as SessionModified)?.user?.sessionId || userInfo?._id
        }/posts`
      );
      let myProfilePostsData: PostWithCreatorType[] = [];
      if (getMyProfilePostsData.ok) {
        myProfilePostsData = await getMyProfilePostsData.json();
        setPosts(myProfilePostsData);
      }
    };
    if (
      (session as SessionModified)?.user?.sessionId ||
      userInfo?.isAuthorized
    ) {
      getMyProfilePosts();
    }
  }, [session, userInfo]);

  return status === "authenticated" || userInfo?.isAuthorized ? (
    <Profile
      name="My"
      desc="Welcome to your profile"
      posts={posts}
      handleDeleteClick={handleDelete}
      handleEditClick={handleEdit}
    />
  ) : null;
}

export default MyProfile;
