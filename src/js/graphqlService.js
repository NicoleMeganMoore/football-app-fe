import axios from "axios";
import _get from "lodash/get";

import { refreshToken, signOutUser } from "../redux/modules/authentication";
import { store } from "../App";

const GENERAL_ERROR_MESSAGE = "Something went wrong, please try again.";

export const graphqlRequest = async (query, token) => {
  const axiosInstance = axios.create({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : undefined
    }
  });

  // Interceptor to refresh expired access tokens
  axiosInstance.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      const statusCode = _get(error, "response.data.errors[0].statusCode");
      const originalRequest = { ...error.config };

      if (statusCode === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        // Make call to token endpoint to refresh token
        return store
          .dispatch(refreshToken())
          .then(tokens => {
            if (tokens) {
              // Return originalRequest object with Axios.
              originalRequest.headers = {
                ...originalRequest.headers,
                Authorization: `Bearer ${tokens.accessToken}`
                // Retry: true
              };
              return axios(originalRequest);
            }
            store.dispatch(signOutUser());
            return Promise.reject();
          })
          .catch(() => {
            store.dispatch(signOutUser());
            return Promise.reject();
          });
      }

      // If you make it here, there was a non-token related error
      return Promise.reject(error);
    }
  );

  const requestBody = {
    query: query
  };

  try {
    const response = await axiosInstance.post(
      "http://localhost:8080/graphql",
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
