import { Slide, toast } from "react-toastify";
import { api } from "./axiosInstance";

export const atseStudentReg = async (payload) => {
  try {
    // Await the API call to ensure it's complete before proceeding
    const res = await api.post("/registration_rec/create", payload);

    if (res.status === 201) {
      toast.success("Exam Started!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Slide,
      });
    } else {
      toast.error("Exam Starting Failed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Slide,
      });
    }
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
