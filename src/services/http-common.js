import axios from "axios";

const headers = {
  "Content-type": "application/json",
}

export default axios.create({
  baseURL: process.env.REACT_APP_API,
  headers
});
