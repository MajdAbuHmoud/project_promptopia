import PromptCard from "./PromptCard";

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
  return (
    <section className="w-full">
      <h1 className="head_text">
        <span className="purple_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="prompt_layout">
        {posts.map((post) => {
          return (
            <PromptCard
              key={post._id}
              post={post}
              handleEditClick={handleEditClick}
              handleDeleteClick={handleDeleteClick}
              handleTagClick={handleTagClick}
            />
          );
        })}
      </div>
    </section>
  );
}

export default Profile;
