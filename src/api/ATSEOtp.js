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
  console.log("Payload before API call:Verify", payload); // Debugging line
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

export default sendOTP;
