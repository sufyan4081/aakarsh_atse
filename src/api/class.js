import { api } from "./axiosInstance";

export const getClass = async () => {
  try {
    const res = await api.get("class/fetchClass");
    const data = res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
