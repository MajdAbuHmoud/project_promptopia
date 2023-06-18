import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export type UserType = {
  _id: string;
  email: string;
  username: string;
  image: string;
  sessionId: string;
};

export type PassageUserType = {
  _id: string;
  email: string;
  username: string;
  image: string;
  isAuthorized: boolean;
};

export type PromptType = {
  userId: string;
  prompt: string;
  tag: string;
};

export type Post = {
  prompt: string;
  tag: string;
};

export type PostWithCreatorType = {
  _id: string;
  creator: UserType;
  prompt: string;
  tag: string;
};

export type RequestCookieModified = RequestCookie & {
  username: string;
  image: string;
  email: string;
};

export type PassageAuthEnvValuesType = {
  appID?: string;
  apiKey?: string;
};
