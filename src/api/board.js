import { api } from "./axiosInstance";

export const getBoard = async () => {
  try {
    const res = await api.get("board/fetchBoards");
    const data = res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
