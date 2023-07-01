"use client";

import Form from "@components/Form";
import { UserType } from "@types";
import { useStore } from "@utils/store/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

function CreatePrompt() {
  const router = useRouter();
  const { userInfo, getUserInfo } = useStore();
  const { data: session, status } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  if (status === "unauthenticated" && !userInfo?.isAuthorized) {
    router.push("/auth/signIn");
  }

  const createPrompt = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let userId = "";
      if (session?.user) {
        userId = (session?.user as UserType).sessionId;
      } else if (userInfo?.isAuthorized) {
        userId = userInfo._id;
      }

      const response = await fetch("/api/prompt/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!userInfo) {
      getUserInfo();
    }
  }, [getUserInfo, userInfo]);

  return status === "authenticated" || userInfo?.isAuthorized ? (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  ) : null;
}

export default CreatePrompt;
