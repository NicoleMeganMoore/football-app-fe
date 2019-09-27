import axios from "axios";
import _get from "lodash/get";

const GENERAL_ERROR_MESSAGE = "Something went wrong, please try again.";

export const graphqlRequest = async (query, token) => {
  const axiosInstance = axios.create({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : undefined
    }
  });

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
