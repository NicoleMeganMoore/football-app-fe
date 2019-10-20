import axios from "axios";
import _get from "lodash/get";

import { refreshToken, signOutUser } from "../redux/modules/authentication";
import { store } from "../redux/store";
import { getTokens } from "../redux/rootReducer";

const GENERAL_ERROR_MESSAGE = "Something went wrong, please try again.";

const retryOnTokenExpiry = axiosInstance => {
  // Interceptor to refresh expired access tokens
  axiosInstance.interceptors.response.use(null, error => {
    const { config } = error;

    // const originalRequest = error.config;
    const statusCode = _get(error, "response.data.errors[0].statusCode");
    const errorMessage = _get(error, "response.data.errors[0].message");

    if (statusCode === 401 && errorMessage === "Invalid Refresh Token") {
      store.dispatch(signOutUser());
      return Promise.reject(error);
    } else if (statusCode === 401 && errorMessage === "Expired Token") {
      // Make call to token endpoint to refresh token
      return store
        .dispatch(refreshToken())
        .then(() => {
          const state = store.getState();
          const { accessToken } = getTokens(state);
          const retryConfig = {
            ...config,
            headers: {
              ...config.headers,
              Authorization: `Bearer ${accessToken}`
            },
            isRetry: true
          };

          // Return original request object with new access token.
          return new Promise((resolve, reject) => {
            axios
              .request(retryConfig)
              .then(response => {
                resolve(response);
              })
              .catch(error => {
                reject(error);
              });
          });
        })
        .catch(err => {
          return Promise.reject(err);
        });
    }
    return Promise.reject(error);
  });
};

export const graphqlRequest = async query => {
  const state = store.getState();
  const { accessToken } = getTokens(state);
  const axiosInstance = axios.create({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: accessToken ? `Bearer ${accessToken}` : undefined
    }
  });

  retryOnTokenExpiry(axiosInstance);

  const requestBody = {
    query: query
  };

  try {
    const response = await axiosInstance.post(
      "http://localhost:3031/graphql",
      JSON.stringify(requestBody)
    );

    if (_get(response, "data.errors")) {
      return Promise.reject(
        _get(response, "data.errors[0].message", GENERAL_ERROR_MESSAGE)
      );
    }
    return Promise.resolve(_get(response, "data.data"));
  } catch (err) {
    return Promise.reject(
      _get(err, "response.data.errors[0].message", GENERAL_ERROR_MESSAGE)
    );
  }
};
