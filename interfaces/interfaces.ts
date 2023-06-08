import { DefaultSession, Profile } from "next-auth";

export interface ProfileModified extends Profile {
  picture: string;
}

export interface SessionModified extends DefaultSession {
  user?: {
    sessionId: string;
  } & DefaultSession["user"];
}

export interface RequestParams {
  params: {
    [key: string]: string | string[];
  };
}
