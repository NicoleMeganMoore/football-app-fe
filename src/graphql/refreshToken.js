import { graphqlRequest } from "../js/graphqlService";
import { history } from "../App";
import _get from "lodash/get";
import { store } from "../redux/store";

import { SET_TOKENS } from "../redux/modules/authentication";

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
      store.dispatch({
        type: SET_TOKENS,
        payload: _get(response, "token.tokens")
      });
      return Promise.resolve();
    })
    .catch(err => {
      history.push("/login");
      return Promise.reject(err);
    });
};
