import axios from "axios";

/**
 *
 * @param {string} token - The token that will be sent in the x-content-data
 * @returns {AxiosInstance}
 */
const http = (token) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["x-access-token"] = token;
  }

  return axios.create({
    baseURL: "/api/v1",
    headers: headers,
    mode: "cors",
  });
};

export default http;
