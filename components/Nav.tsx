"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ClientSafeProvider,
  getProviders,
  signIn,
  signOut,
  useSession,
} from "next-auth/react";
import { useEffect, useState } from "react";
import { PassageUserType } from "@types";

function Nav() {
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState<PassageUserType>({
    _id: "",
    username: "",
    email: "",
    image: "",
    isAuthorized: false,
  });
  const [loading, setLoading] = useState(true);

  const [providers, setProviders] = useState<Record<
    string,
    ClientSafeProvider
  > | null>(null);

  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setProvidersData = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    const getUserProfileInfo = async () => {
      const getUserProfileInfoResponse = await fetch("/api/auth/passageAuth");
      const data = await getUserProfileInfoResponse.json();
      setUserInfo(data);
      setLoading(false);
    };
    getUserProfileInfo();
    setProvidersData();
  }, []);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {!loading ? (
        <>
          {/* Desktop Navigation */}
          <div className="sm:flex hidden">
            {(session?.user && status === "authenticated") ||
            userInfo.isAuthorized ? (
              <div className="flex gap-3 md:gap-5">
                <Link href="/create-prompt" className="black_btn">
                  Create Post
                </Link>

                <button
                  type="button"
                  className="outline_btn"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>

                <Link href="/profile">
                  <Image
                    src={
                      session?.user?.image ||
                      userInfo.image ||
                      "/assets/images/logo.svg"
                    }
                    alt="Profile"
                    width={37}
                    height={37}
                    className="rounded-full"
                  />
                </Link>
              </div>
            ) : null}
            {!session?.user &&
            status === "unauthenticated" &&
            !userInfo.isAuthorized ? (
              <div className="flex gap-3 md:gap-5">
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
                <Link href="/auth/passageAuth/signIn">
                  <button type="button" className="black_btn">
                    Sign In
                  </button>
                </Link>
              </div>
            ) : null}
          </div>

          {/* Mobile Navigation */}
          <div className="sm:hidden flex relative">
            {session?.user || userInfo.isAuthorized ? (
              <div className="flex">
                <Image
                  src={session?.user?.image || "/assets/images/logo.svg"}
                  alt="Profile"
                  width={37}
                  height={37}
                  className="rounded-full cursor-pointer"
                  onClick={() => setToggleDropdown((prev) => !prev)}
                />
                {toggleDropdown && (
                  <div className="dropdown">
                    <Link
                      href="/profile"
                      className="dropdown_link"
                      onClick={() => setToggleDropdown(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/create-prompt"
                      className="dropdown_link"
                      onClick={() => setToggleDropdown(false)}
                    >
                      Create Prompt
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setToggleDropdown(false);
                        signOut();
                      }}
                      className="mt-5 w-full black_btn"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-3 md:gap-5">
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
                <Link href="/auth/passageAuth/signIn">
                  <button type="button" className="black_btn">
                    Sign In
                  </button>
                </Link>
              </div>
            )}
          </div>
        </>
      ) : null}
    </nav>
  );
}

export default Nav;
