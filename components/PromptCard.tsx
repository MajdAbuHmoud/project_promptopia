"use client";

import { PostWithCreatorType, UserType } from "@types";
import { useStore } from "@utils/store/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type PromptCardProps = {
  post: PostWithCreatorType;
  handleTagClick?: (tag: string) => void;
  handleEditClick?: (post: PostWithCreatorType) => void;
  handleDeleteClick?: (post: PostWithCreatorType) => void;
};

function PromptCard({
  post,
  handleTagClick,
  handleEditClick,
  handleDeleteClick,
}: PromptCardProps) {
  const { data: session } = useSession();
  const { userInfo } = useStore();
  const pathname = usePathname();
  const router = useRouter();
  const [copied, setCopied] = useState("");
  const [userId, setUserId] = useState("");

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };

  const handleProfileClick = () => {
    if (post.creator._id === userId) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  useEffect(() => {
    if ((session?.user as UserType)?.sessionId) {
      setUserId((session?.user as UserType)?.sessionId);
    } else if (userInfo?.isAuthorized) {
      setUserId(userInfo?._id as string);
    }
  }, [userInfo, session]);

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            className="rounded-full object-contain display-block"
            src={post.creator.image}
            alt={post.creator.username}
            width={40}
            height={40}
            onClick={handleProfileClick}
          />
          <div className="flex flex-col">
            <h3 className="text-white" onClick={handleProfileClick}>
              {post.creator.username}
            </h3>
            <p className="text-sm text-white/50" onClick={handleProfileClick}>
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className="copy_btn self-start" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="copy_btn"
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="font-monaSans text-sm text-subtle-white my-4">
        {post.prompt}
      </p>
      <p
        className="font-monaSans text-subtle-white text-sm font-bold cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>
      {userId === post.creator._id && pathname === "/profile" ? (
        <div className="flex flex-center gap-4">
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => handleEditClick && handleEditClick(post)}
          >
            Edit
          </button>
          {/* <p className="text-sm cursor-pointer green_gradient" onClick={}>
            Edit
          </p> */}
          <button
            className="btn btn-danger"
            type="button"
            onClick={() => handleDeleteClick && handleDeleteClick(post)}
          >
            Delete
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default PromptCard;
