"use client";

import Profile from "@components/Profile";
import { SessionModified } from "@interfaces/interfaces";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function MyProfile() {
  const router = useRouter();
  const { data: session } = useSession();
  console.log("🚀 ~ file: page.tsx:10 ~ MyProfile ~ session:", session);
  const [posts, setPosts] = useState<PostWithCreatorType[]>([]);

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
    console.log("called");
    const getMyProfilePosts = async () => {
      const getMyProfilePostsData = await fetch(
        `/api/users/${(session as SessionModified)?.user?.sessionId}/posts`
      );
      const myProfilePostsData = await getMyProfilePostsData.json();

      setPosts(myProfilePostsData);
    };
    if ((session as SessionModified)?.user?.sessionId) getMyProfilePosts();
  }, [session]);

  return (
    <Profile
      name="My"
      desc="Welcome to your profile"
      posts={posts}
      handleDeleteClick={handleDelete}
      handleEditClick={handleEdit}
    />
  );
}

export default MyProfile;
