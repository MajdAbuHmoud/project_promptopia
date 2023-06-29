"use client";

import Form from "@components/Form";
import { Post, PostWithCreatorType, UserType } from "@types";
import { useStore } from "@utils/store/store";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

function EditPrompt() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { userInfo } = useStore();
  console.log("🚀 ~ file: page.tsx:14 ~ EditPrompt ~ userInfo:", userInfo);
  const { data: session, status } = useSession();
  const id = searchParams.get("id");
  const [submitting, setSubmitting] = useState(false);
  const [isPostOwner, setIsPostOwner] = useState(false);
  const [post, setPost] = useState<Post>({
    prompt: "",
    tag: "",
  });

  if (status === "unauthenticated" && !userInfo?.isAuthorized) {
    router.push("/auth/signIn");
  }

  useEffect(() => {
    const getPrompt = async () => {
      try {
        const response = await fetch(`/api/prompt/${id}`);
        const data = await response.json();
        console.log("🚀 ~ file: page.tsx:32 ~ getPrompt ~ data:", data);

        let userId = "";
        if (session?.user) {
          userId = (session?.user as UserType).sessionId;
        } else if (userInfo?.isAuthorized) {
          userId = userInfo._id;
        }

        if (data.creator._id === userId) {
          setIsPostOwner(true);
        } else {
          router.push("/");
        }

        setPost(data);
      } catch (err) {
        console.log(err);
      }
    };

    if (id && (userInfo?.isAuthorized || status === "authenticated"))
      getPrompt();
  }, [id, userInfo, status, router, session?.user]);

  const updatePrompt = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(`/api/prompt/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post?.prompt,
          tag: post?.tag,
        }),
      });

      if (response.ok) {
        router.push("/profile");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (status === "authenticated" || userInfo?.isAuthorized) &&
    isPostOwner ? (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  ) : null;
}

export default EditPrompt;
