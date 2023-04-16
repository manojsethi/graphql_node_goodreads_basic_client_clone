import { GetStaticProps } from "next";
import { SSRConfig } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
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

export const getStaticProps: GetStaticProps<SSRConfig> = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};
