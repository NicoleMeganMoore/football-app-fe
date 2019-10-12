import axios from "axios";
// import _get from "lodash/get";

export const mySportsFeedRequest = (url, version) => {
  const axiosInstance = axios.create({
    auth: {
      username: "a248342a-d622-4fdb-b2ce-f5fdc5",
      password: version === 1 ? "" : "MYSPORTSFEEDS"
    }
  });

  return axiosInstance
    .get(url)
    .then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error));
};
