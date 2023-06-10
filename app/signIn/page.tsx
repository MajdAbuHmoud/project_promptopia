"use client";

import { PassageElement } from "@passageidentity/passage-elements/*";
import { useEffect } from "react";

export default function SignIn() {
  const appID = process.env.PASSAGE_APP_ID;

  useEffect(() => {
    require("@passageidentity/passage-elements/passage-auth");

    const passageAuth = document?.querySelector(
      "passage-auth"
    ) as PassageElement;
    if (passageAuth) {
      passageAuth.beforeAuth = () => {
        console.log("beforeAuth");
        return true;
      };
    }
  }, []);

  return <passage-auth app-id={appID}></passage-auth>;
}
