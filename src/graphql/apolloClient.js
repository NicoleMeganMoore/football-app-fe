import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { split } from "apollo-link";
import { setContext } from "apollo-link-context";
import { getMainDefinition } from "apollo-utilities";
import { execute } from "apollo-link";
import gql from "graphql-tag";

const wsLink = new WebSocketLink({
  uri: `ws://localhost:3031/graphql`,
  options: {
    reconnect: true,
    timeout: 60000
    // connectionParams: {
    //   authToken: localStorage.getItem(AUTH_TOKEN),
    // }
  }
});

wsLink.subscriptionClient.maxConnectTimeGenerator.duration = () =>
  wsLink.subscriptionClient.maxConnectTimeGenerator.max;

const httpLink = new HttpLink({ uri: "http://localhost:3031/graphql" });

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const accessToken = localStorage.getItem("accessToken");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : ""
    }
  };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache()
});

const subscribe = (query, handlers) => {
  const operation = {
    query: gql`
      ${query}
    `
  };

  return execute(wsLink, operation).subscribe(handlers);
};

export default apolloClient;
export { subscribe };
