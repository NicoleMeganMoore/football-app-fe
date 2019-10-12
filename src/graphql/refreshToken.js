import { graphqlRequest } from "../js/graphqlService";
import { history } from "../App";
import _get from "lodash/get";

export const refreshTokenRequest = refreshToken => {
  const query = `
  query {
    token(refreshToken: "${refreshToken}") {
      userId
      tokens {
        accessToken
        refreshToken
      }
      tokenExpiration
    }
  }
`;

  return graphqlRequest(query)
    .then(response => {
      localStorage.setItem(
        "accessToken",
        _get(response, "token.tokens.accessToken")
      );
      localStorage.setItem(
        "refreshToken",
        _get(response, "token.tokens.refreshToken")
      );
      return Promise.resolve();
    })
    .catch(err => {
      history.push("/login");
      return Promise.reject(err);
    });
};
