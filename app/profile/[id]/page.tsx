"use client";

import Profile from "@components/Profile";
import { PostWithCreatorType } from "@types";
import { useSearchParams, useParams } from "next/navigation";
import { useEffect, useState } from "react";

function UserProfile() {
  const params = useParams();

  const searchParams = useSearchParams();

  const name = searchParams.get("name");

  let { id } = params;

  const [posts, setPosts] = useState<PostWithCreatorType[]>([]);

  useEffect(() => {
    console.log("called");
    const getMyProfilePosts = async () => {
      const getMyProfilePostsData = await fetch(`/api/users/${id}/posts`);
      const myProfilePostsData = await getMyProfilePostsData.json();

      setPosts(myProfilePostsData);
    };
    if (id) getMyProfilePosts();
  }, [id]);

  return (
    <Profile name={name || ""} desc="Welcome to your profile" posts={posts} />
  );
}

export default UserProfile;
