import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";
import { ReactNode } from "react";
import { Session } from "next-auth";

export const metaData = {
  title: "Promptopia",
  description: "Descover & Share AI Prompts",
};

interface LayoutProps {
  children: ReactNode;
  session: Session | null;
}

function RootLayout({ children, session }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <Provider session={session}>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            {/* <Nav /> */}
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}

export default RootLayout;
