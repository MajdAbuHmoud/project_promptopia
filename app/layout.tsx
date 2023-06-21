import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";
import { ReactNode } from "react";
import { Session } from "next-auth";
import { useStore } from "@utils/store/store";
import { cookies } from "next/dist/client/components/headers";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const metaData = {
  title: "Promptopia",
  description: "Descover & Share AI Prompts",
};

interface LayoutProps {
  children: ReactNode;
  session: Session | null;
}

async function RootLayout({ children, session }: LayoutProps) {
  const userInfoFromStore = useStore.getState().userInfo;
  console.log(
    "🚀 ~ file: layout.tsx:22 ~ RootLayout ~ userInfoFromStore:",
    userInfoFromStore
  );
  if (!userInfoFromStore) {
    const cookieStore = cookies();
    const authToken = cookieStore.get("psg_auth_token");
    console.log(
      "🚀 ~ file: layout.tsx:23 ~ RootLayout ~ authToken:",
      authToken
    );
    const getUserProfileInfoResponse = await fetch(
      "http://localhost:3000/api/auth/passageAuth",
      {
        headers: {
          Cookie: `psg_auth_token=${authToken?.value}`,
        },
      }
    );
    const data = await getUserProfileInfoResponse.json();
    console.log("🚀 ~ file: layout.tsx:30 ~ RootLayout ~ data:", data);

    useStore.setState({ userInfo: data });
  } else {
    console.log(
      "🚀 ~ file: layout.tsx:36 ~ RootLayout ~ userInfoFromStore:",
      userInfoFromStore
    );
  }
  return (
    <html lang="en">
      <body>
        <Provider session={session}>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}

export default RootLayout;
