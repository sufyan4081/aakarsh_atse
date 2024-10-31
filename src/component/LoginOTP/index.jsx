import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { toast, Slide } from "react-toastify";
import logo from "../../assets/logo.png";
import { CustomTextField } from "../CustomeTextField";

const LoginOTP = ({ setOpen }) => {
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [otpValues, setOtpValues] = useState(["", "", "", ""]); // State for OTP digits

  const initialValues = {
    phone: "",
  };

  const validationSchema = Yup.object({
    phone: Yup.string()
      .matches(/^\d{10}$/, "Mobile number must be 10 digits")
      .required("Please enter mobile number"),
  });

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
    setOtpValues(["", "", "", ""]); // Reset OTP boxes
  };

  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    if (/^\d$/.test(value) || value === "") {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);

      if (value && index < 3) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

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
      onSubmit={(values) => {
        const otp = otpValues.join("");
        console.log("Submitted Data:", { phone: values.phone, otp });
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
      }}
    >
      {({ values, errors, touched, setFieldValue, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
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
                width: "100%",
                textAlign: "center",
                color: "darkslategray",
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
                <Box display="flex" gap={1} justifyContent="center">
                  {otpValues.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-input-${index}`}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(e, index)}
                      style={{
                        width: "2rem",
                        height: "2rem",
                        textAlign: "center",
                        fontSize: "1.2rem",
                      }}
                    />
                  ))}
                </Box>
              )}

              <Button
                size="medium"
                variant="contained"
                onClick={() => {
                  otpSent ? handleSubmit() : handleSendOtp(setFieldValue);
                }}
                disabled={
                  otpSent
                    ? otpValues.some((value) => value === "")
                    : values.phone.length !== 10
                }
                sx={{ textTransform: "none", mt: 2 }}
              >
                {otpSent ? "Login" : "Verify Mobile Number"}
              </Button>

              {otpSent && (
                <Button
                  size="small"
                  variant="text"
                  color="primary"
                  onClick={() => handleSendOtp(setFieldValue)}
                  disabled={timer > 0}
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
