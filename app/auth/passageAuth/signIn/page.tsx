"use client";

import { PassageAuthEnvValuesType } from "@types";
import { useEffect, useState } from "react";

export default function SignIn() {
  const [passageAuthEnvValues, setPassageAuthEnvValues] =
    useState<PassageAuthEnvValuesType>({});
  console.log(
    "🚀 ~ file: page.tsx:8 ~ SignIn ~ passageAuthEnvValues:",
    passageAuthEnvValues
  );

  useEffect(() => {
    require("@passageidentity/passage-elements/passage-auth");

    const fetechEnvValues = async () => {
      const response = await fetch("/api/auth/passageAuth/envValues");
      const data = await response.json();
      console.log("🚀 ~ file: page.tsx:17 ~ fetechEnvValues ~ data", data);
      setPassageAuthEnvValues(data);
    };
    fetechEnvValues();

    // const passageAuth = document?.querySelector(
    //   "passage-auth"
    // ) as PassageElement;
  }, []);

  return passageAuthEnvValues.appID ? (
    <passage-auth app-id={passageAuthEnvValues.appID}></passage-auth>
  ) : null;
}
