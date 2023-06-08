import { getSession } from "next-auth/react";
import type { AppProps } from "next/app";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import RootLayout from "./layout";
import Provider from "@components/Provider";

interface MyAppProps extends AppProps {
  session: Session | null;
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const { session, ...rest } = pageProps;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      setLoading(false);

      return session;
    };

    fetchData();
  }, []);

  if (loading) {
    // Optional: You can show a loading state while the session is being fetched
    return <div>Loading...</div>;
  }

  return (
    <Provider session={session}>
      <RootLayout session={session}>
        <Component {...rest} />
      </RootLayout>
    </Provider>
  );
}

export default MyApp;
