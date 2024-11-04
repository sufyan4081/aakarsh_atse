import { api } from "./axiosInstance";

export const getExam = async () => {
  try {
    const res = await api.get("exam/fetchExams");
    const data = res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
