import { Slide, toast } from "react-toastify";
import { api } from "./axiosInstance";

export const examDataById = async (payload) => {
  try {
    console.log("Payload before API call:", payload); // Debugging line
    // Await the API call to ensure it's complete before proceeding
    const res = await api.get(`/paperFormat/${payload}`);
    console.log("res.data", res);
    return res.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "An error occurred"; // Extract error message from error response
    // Catch any errors and display an error toast
    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      transition: Slide,
    });
    console.error("API Error:", error);
  }
};
