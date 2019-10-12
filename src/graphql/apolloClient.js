import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { onError } from "apollo-link-error";
import { split, Observable } from "apollo-link";
import { setContext } from "apollo-link-context";
import { getMainDefinition } from "apollo-utilities";
import { execute } from "apollo-link";
import { refreshTokenRequest } from "./refreshToken";
import gql from "graphql-tag";
import _find from "lodash/find";

const promiseToObservable = promise =>
  new Observable(subscriber => {
    promise.then(
      value => {
        if (subscriber.closed) return;
        subscriber.next(value);
        subscriber.complete();
      },
      err => subscriber.error(err)
    );
    return subscriber; // this line can removed, as per next comment
  });

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (
      graphQLErrors &&
      _find(graphQLErrors, error => error.message === "UNAUTHENTICATED")
    ) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        return promiseToObservable(refreshTokenRequest(refreshToken)).flatMap(
          () => forward(operation)
        );
      }
    }
  }
);

const getAuthToken = () => {
  return localStorage.getItem("accessToken");
};

const wsLink = new WebSocketLink({
  uri: `ws://localhost:3031/graphql`,
  options: {
    reconnect: true,
    timeout: 60000,
    connectionParams: {
      authToken: getAuthToken()
    }
  }
});

wsLink.subscriptionClient.maxConnectTimeGenerator.duration = () =>
  wsLink.subscriptionClient.maxConnectTimeGenerator.max;

const httpLink = new HttpLink({
  uri: "http://localhost:3031/graphql"
});

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
  link: errorLink
    // .concat(retryLink)
    .concat(authLink)
    .concat(link),
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
