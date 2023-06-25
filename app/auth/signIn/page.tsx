"use client";

import { PassageAuthEnvValuesType } from "@types";
import {
  opacityVariants,
  parentOpacityVariants,
} from "@utils/framerMotion/variants";
import { useStore } from "@utils/store/store";
import { AnimatePresence, motion } from "framer-motion";
import {
  ClientSafeProvider,
  getProviders,
  signIn,
  useSession,
} from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignIn() {
  const [passageAuthEnvValues, setPassageAuthEnvValues] =
    useState<PassageAuthEnvValuesType>({});

  const [providers, setProviders] = useState<Record<
    string,
    ClientSafeProvider
  > | null>(null);

  const router = useRouter();

  const { status } = useSession();
  const { userInfo } = useStore();

  const [isMounted, setIsMounted] = useState(false);

  if (status === "authenticated" || userInfo?.isAuthorized) {
    router.push("/");
  }

  useEffect(() => {
    setIsMounted(true);
    require("@passageidentity/passage-elements/passage-auth");

    const fetechEnvValues = async () => {
      const response = await fetch("/api/auth/passageAuth/envValues");
      const data = await response.json();
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

  return (
    <AnimatePresence>
      {isMounted &&
      passageAuthEnvValues.appID &&
      status === "unauthenticated" ? (
        <motion.div
          key="signIn"
          variants={parentOpacityVariants}
          initial="hidden"
          animate="show"
          className="authContainer"
        >
          <motion.div key="passageAuthSection" variants={opacityVariants}>
            <passage-auth app-id={passageAuthEnvValues.appID}></passage-auth>
          </motion.div>

          <motion.div
            variants={opacityVariants}
            className="flex flex-col align-center gap-3 md:gap-5"
          >
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  className="outline_btn"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  Sign In with {provider.name}
                </button>
              ))}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
