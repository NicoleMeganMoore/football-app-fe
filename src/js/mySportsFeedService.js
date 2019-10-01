import axios from "axios";
import _get from "lodash/get";

export const mySportsFeedRequest = url => {
  const axiosInstance = axios.create({
    auth: {
      username: "3216d5f7-36cd-4fa7-b35e-20b3a0",
      password: "password"
    }
  });

  return axiosInstance
    .get(url)
    .then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error));
};
