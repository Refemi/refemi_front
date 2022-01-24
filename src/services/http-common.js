import axios from "axios";

/**
 * 
 * @param {string} token - The token that will be sent in the x-content-data
 * @returns {AxiosInstance}
 */
const http = (token) => {
  const headers = {
    'Content-Type': 'application/json'
  }

  if (token) {
    headers['x-access-token'] = token;
  }
  
  return axios.create({
    baseURL: process.env.REACT_APP_API,
    headers: headers
  })
}


export default http;
