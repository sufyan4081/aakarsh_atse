import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.smarthought.in/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
