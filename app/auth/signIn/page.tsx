"use client";

import { PassageAuthEnvValuesType } from "@types";
import { data } from "autoprefixer";
import { motion } from "framer-motion";
import {
  ClientSafeProvider,
  getProviders,
  signIn,
  useSession,
} from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignIn() {
  const [passageAuthEnvValues, setPassageAuthEnvValues] =
    useState<PassageAuthEnvValuesType>({});

  const [providers, setProviders] = useState<Record<
    string,
    ClientSafeProvider
  > | null>(null);
  console.log(
    "🚀 ~ file: page.tsx:8 ~ SignIn ~ passageAuthEnvValues:",
    passageAuthEnvValues
  );

  const router = useRouter();

  const { data: session, status } = useSession();

  const [isMounted, setIsMounted] = useState(false);

  if (status === "authenticated") {
    router.push("/");
  }

  useEffect(() => {
    setIsMounted(true);
    require("@passageidentity/passage-elements/passage-auth");

    const fetechEnvValues = async () => {
      const response = await fetch("/api/auth/passageAuth/envValues");
      const data = await response.json();
      console.log("🚀 ~ file: page.tsx:17 ~ fetechEnvValues ~ data", data);
      setPassageAuthEnvValues(data);
    };
    const setProvidersData = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    fetechEnvValues();
    setProvidersData();

    // const passageAuth = document?.querySelector(
    //   "passage-auth"
    // ) as PassageElement;
  }, []);

  return isMounted && status === "unauthenticated" ? (
    <motion.div>
      <div className="flex flex-col align-center gap-3 md:gap-5">
        {providers &&
          Object.values(providers).map((provider) => (
            <button
              type="button"
              className="black_btn"
              key={provider.name}
              onClick={() => signIn(provider.id)}
            >
              Sign In with {provider.name}
            </button>
          ))}
      </div>
      {passageAuthEnvValues.appID ? (
        <passage-auth app-id={passageAuthEnvValues.appID}></passage-auth>
      ) : null}
    </motion.div>
  ) : null;
}
