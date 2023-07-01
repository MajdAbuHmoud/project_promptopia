"use client";

import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";
import { ReactNode, useEffect } from "react";
import { Session } from "next-auth";
import { useStore } from "@utils/store/store";

export const metaData = {
  title: "Promptopia",
  description: "Descover & Share AI Prompts",
};

interface LayoutProps {
  children: ReactNode;
  session: Session | null;
}

function RootLayout({ children, session }: LayoutProps) {
  const { userInfo, getUserInfo, userInfoProcessed } = useStore();

  useEffect(() => {
    if (!userInfo) {
      getUserInfo();
    }
  }, [userInfo, getUserInfo]);

  return (
    <html lang="en">
      <body>
        <Provider session={session}>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            {userInfoProcessed ? (
              <>
                <Nav />
                {children}
              </>
            ) : null}
          </main>
        </Provider>
      </body>
    </html>
  );
}

export default RootLayout;
