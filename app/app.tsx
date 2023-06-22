import type { AppProps } from "next/app";
import { Session } from "next-auth";
import RootLayout from "./layout";
import Provider from "@components/Provider";

interface MyAppProps extends AppProps {
  session: Session | null;
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const { session, ...rest } = pageProps;

  return (
    <Provider session={session}>
      <RootLayout session={session}>
        <Component {...rest} />
      </RootLayout>
    </Provider>
  );
}

export default MyApp;
