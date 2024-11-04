import { api } from "./axiosInstance";

export const getStream = async () => {
  try {
    const res = await api.get("streams/fetchStream");
    const data = res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
