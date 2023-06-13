"use client";

import { useEffect } from "react";

export default function SignIn() {
  const appID = process.env.PASSAGE_APP_ID;

  useEffect(() => {
    require("@passageidentity/passage-elements/passage-auth");

    // const passageAuth = document?.querySelector(
    //   "passage-auth"
    // ) as PassageElement;
  }, []);

  return <passage-auth app-id={appID}></passage-auth>;
}
