import Head from "next/head";
import { useEffect } from "react";

export default function Home(props: any) {
  useEffect(() => {}, []);
  return (
    <>
      <Head>
        <title>Good Reads Clone</title>
        <meta
          name="description"
          content="Good Reads Clone in GraphQL Server 4 and Apollo GraphQL Client"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}
