import { Post } from "@types";
import Link from "next/link";

interface FormProps {
  type: string;
  post: Post;
  setPost: React.Dispatch<React.SetStateAction<Post>>;
  submitting: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

function Form({ type, post, setPost, submitting, handleSubmit }: FormProps) {
  return (
    <section className="flex-center flex-col">
      <h1 className="head_text">
        <span className="purple_gradient">{type} Post</span>
      </h1>
      <p className="mt-3 text-white">
        {type} and share your amazing prompts with the world!{" "}
        <span className="purple_gradient">Be creative!</span>
      </p>
      <form
        className="mt-10 theme_card w-full flex flex-col gap-7"
        onSubmit={handleSubmit}
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-subtle-white">
            Your cool AI prompt
          </span>
        </label>
        <textarea
          placeholder="Write your prompt here..."
          value={post.prompt}
          required
          className="form_textarea_dark"
          onChange={(e) => setPost({ ...post, prompt: e.target.value })}
        />
        <label>
          <span className="font-satoshi font-semibold text-base text-subtle-white">
            Tag {` `}
            <span className="font-normal">
              (#product, #webdevelopment, #NextJS)
            </span>
          </span>
        </label>
        <textarea
          placeholder="#tag"
          value={post.tag}
          required
          className="form_textarea_dark"
          onChange={(e) => setPost({ ...post, tag: e.target.value })}
        />
        <div className="flex-end gap-4">
          <Link href="/" className="text-subtle-white text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            className="purple_gradient_btn"
            disabled={submitting}
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
}

export default Form;
