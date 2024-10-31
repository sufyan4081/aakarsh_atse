import { Avatar, Box, Button, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { CustomTextField } from "../CustomeTextField";
import { Slide, toast } from "react-toastify";
import logo from "../../assets/logo.png";
const LoginOTP = ({ setOpen }) => {
  const [otpSent, setOtpSent] = useState(false); // Track OTP sent status
  const [timer, setTimer] = useState(0);

  const initialValues = {
    phone: "",
    otp: "",
  };

  const validationSchema = Yup.object({
    phone: Yup.string()
      .matches(/^\d{10}$/, "Mobile number must be 10 digits")
      .required("Please enter mobile number"),
    otp: Yup.string().when("otpSent", {
      is: true,
      then: Yup.string()
        .matches(/^\d{4}$/, "OTP must be 6 digits")
        .required("Please enter OTP"),
    }),
  });

  // Function to handle OTP sending and enabling login mode
  const handleSendOtp = (setFieldValue) => {
    setOtpSent(true);
    setTimer(30);
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
    setFieldValue("otp", ""); // Reset OTP field for new entry
    // Reset OTP field for new entry
  };

  // Function to handle login after entering OTP
  const handleLogin = () => {
    setOtpSent(false);
    console.log("Logged in successfully");
    toast.success("Logged in successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      transition: Slide,
    });
    setOpen("form-details");
  };

  // Countdown timer effect
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={() => {}}
    >
      {({ values, errors, touched, setFieldValue }) => (
        <Form>
          <Box
            sx={{
              border: "1px solid #D9D9D9",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "300px",
              borderRadius: "12px",
              padding: "12px",
            }}
          >
            <Box
              sx={{
                // backgroundColor: "blue",
                width: "100%",
                textAlign: "center",
                color: "darkslategray",
                // padding: "10px 0px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography fontWeight="bold" variant="h5">
                Login
              </Typography>
              <Avatar alt="Aakarsh" src={logo}></Avatar>
            </Box>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <CustomTextField
                label="Enter Mobile Number"
                name="phone"
                helperText={touched.phone && errors.phone ? errors.phone : ""}
                disabled={otpSent} // Disable after OTP sent
              />

              {otpSent && (
                <CustomTextField
                  label="Enter OTP"
                  name="otp"
                  helperText={touched.otp && errors.otp ? errors.otp : ""}
                />
              )}

              <Button
                size="medium"
                variant="contained"
                onClick={() => {
                  otpSent ? handleLogin() : handleSendOtp(setFieldValue);
                }}
                disabled={
                  otpSent
                    ? values.otp.length !== 6 // Enable when OTP is 6 digits
                    : values.phone.length !== 10 // Enable when phone is 10 digits
                }
                sx={{ textTransform: "none" }}
              >
                {otpSent ? "Login" : "Verify Mobile Number"}
              </Button>

              {otpSent && (
                <Button
                  size="small"
                  variant="text"
                  color="primary"
                  onClick={() => handleSendOtp(setFieldValue)}
                  disabled={timer > 0} // Enable Resend OTP after timer ends
                  sx={{ mt: 1, textTransform: "none" }}
                >
                  {timer > 0 ? `Resend OTP in ${timer} seconds` : "Resend OTP"}
                </Button>
              )}
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default LoginOTP;
