import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

import "twin.macro";
import { css as cssImport } from "@emotion/react";
import styledImport from "@emotion/styled";
import { CSSInterpolation } from "@emotion/serialize";

declare module "twin.macro" {
  // The styled and css imports
  const styled: typeof styledImport;
  const css: typeof cssImport;
}

declare module "react" {
  // The tw and css prop
  interface DOMAttributes<T> {
    tw?: string;
    css?: CSSInterpolation;
  }
}

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

export type RequestCookieModified = RequestCookie & {
  username: string;
  image: string;
  email: string;
};

export type PassageAuthEnvValuesType = {
  appID?: string;
  apiKey?: string;
};
