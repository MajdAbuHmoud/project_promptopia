type UserType = {
  _id: string;
  email: string;
  username: string;
  image: string;
  sessionId: string;
};

type PromptType = {
  userId: string;
  prompt: string;
  tag: string;
};

type Post = {
  prompt: string;
  tag: string;
};

type PostWithCreatorType = {
  _id: string;
  creator: UserType;
  prompt: string;
  tag: string;
};
