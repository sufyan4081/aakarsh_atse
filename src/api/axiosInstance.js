import axios from "axios";

export const api = axios.create({
  baseURL: "http://api.smarthought.in/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
