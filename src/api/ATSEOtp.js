import { Slide, toast } from "react-toastify";
import { api } from "./axiosInstance";

export const sendOTP = async (payload) => {
  const res = await api.post("/send-registration-student-otp", payload);
  if (res.status === 200) {
    toast.success("OTP sent successfully", {
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
    toast.error("OTP Sending Failed", {
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
};
export const verifyOTP = async (payload) => {
  try {
    const res = await api.post("/verify-registration-student-otp", payload);
    if (res.status === 200) {
      toast.success("OTP Verified Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Slide,
      });
      return res.data;
    } else {
      toast.error("OTP Sending Failed", {
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
      error.response?.data?.message || error.message || "An error occurred"; // Extracting server's error message

    // Show the extracted error message in the toast
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

export default sendOTP;
