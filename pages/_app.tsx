import Header from "@/components/header";
import "@/styles/globals.css";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import "antd/dist/reset.css";
import type { AppProps } from "next/app";
import Router, { useRouter } from "next/router";
import { onError } from "@apollo/client/link/error";
import { useGetCurrentUserQuery } from "@/gql/generated/graphql";
import { createUploadLink } from "apollo-upload-client";
import constants from "@/utils/constants";
import { Layout } from "antd";

function createApolloClient() {
  const link = ApolloLink.from([
    onError(({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) {
        for (let err of graphQLErrors) {
          switch (err.extensions.code) {
            case "Unauthorized":
              Router.push("/auth/sign-in");
              return forward(operation);
          }
        }
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    }),

    createUploadLink({
      uri: `${constants.BASE_URL}/graphql`,
      credentials: "include",
    }),
  ]);

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });
}
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <ApolloProvider client={createApolloClient()}>
      {router.pathname.includes("auth") ? (
        <Component {...pageProps} />
      ) : (
        <>
          <Header />
          <Layout.Content className="px-20 lg:container mx-auto">
            <Component {...pageProps} />
          </Layout.Content>
        </>
      )}
    </ApolloProvider>
  );
}
