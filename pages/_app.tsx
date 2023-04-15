import Header from "@/components/header";
import "@/styles/globals.css";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";

import "antd/dist/reset.css";
import type { AppProps } from "next/app";
import Router, { useRouter } from "next/router";
import { onError } from "@apollo/client/link/error";
import { useGetCurrentUserQuery } from "@/gql/generated/graphql";
import { createUploadLink } from "apollo-upload-client";
import constants from "@/utils/constants";
import { Layout } from "antd";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { appWithTranslation } from "next-i18next";
function createApolloClient() {
  const wsLink =
    typeof window !== "undefined"
      ? new GraphQLWsLink(
          createClient({
            url: `${constants.WS_BASE_URL}/graphql`,
          })
        )
      : null;

  const newLink =
    typeof window !== "undefined" && wsLink != null
      ? split(
          ({ query }) => {
            const definition = getMainDefinition(query);
            return (
              definition.kind === "OperationDefinition" &&
              definition.operation === "subscription"
            );
          },
          wsLink,
          createUploadLink({
            uri: `${constants.BASE_URL}/graphql`,
            credentials: "include",
          })
        )
      : createUploadLink({
          uri: `${constants.BASE_URL}/graphql`,
          credentials: "include",
        });
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

    newLink,
  ]);

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });
}
const App = ({ Component, pageProps }: AppProps) => {
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
};
export default appWithTranslation(App);
