import { api } from "./axiosInstance";

export const getBranch = async () => {
  try {
    const res = await api.get("branch/branches");
    const data = res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
