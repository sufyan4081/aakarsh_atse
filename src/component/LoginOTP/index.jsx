import React, { useContext, useEffect, useState } from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { Formik, Form, useFormik } from "formik";
import * as Yup from "yup";
import logo from "../../assets/logo.png";
import { CustomTextField } from "../CustomeTextField";
import { useMutation } from "@tanstack/react-query";
import { ExamContext } from "../../atseContext/ExamProvider";
import sendOTP, { verifyOTP } from "../../api/ATSEOtp";
const LoginOTP = ({ setOpen }) => {
  const { setMobileNumber } = useContext(ExamContext);

  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);

  // Initial form values
  const initialValues = {
    mobileNumber: "",
  };

  // Form validation schema
  const validationSchema = Yup.object({
    mobileNumber: Yup.string()
      .matches(/^\d{10}$/, "Mobile number must be 10 digits")
      .required("Please enter mobile number"),
  });

  // Function to handle OTP input changes
  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    if (/^\d$/.test(value) || value === "") {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);

      // Automatically focus the next input if a digit is entered
      if (value && index < 5) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };
  const sendOtpMutation = useMutation({
    mutationFn: (payload) => sendOTP(payload),
    onSuccess: (data) => {
      setOtpSent(true);
      setTimer(30);
      setOtpValues(["", "", "", "", "", ""]);
    },
    onError: (data) => {
      setOtpValues(["", "", "", "", "", ""]);
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: (payload) => verifyOTP(payload),
    onSuccess: (data, id) => {
      setOtpSent(false);
      setMobileNumber(id.mobileNumber);
      console.log("phoneNumberLogin", id.mobileNumber);
      setOpen("form-details");
      setOtpValues(["", "", "", "", "", ""]);
    },
    onError: (data) => {
      setOtpValues(["", "", "", "", "", ""]);
    },
  });
  const handleOnSubmit = (values) => {
    const otp = otpValues.join("");
    const payload = {
      mobileNumber: values.mobileNumber,
      enteredOTP: otp,
    };

    console.log("payload", payload);

    verifyOtpMutation.mutate(payload);
  };

  // useFormik hook to manage form state
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleOnSubmit,
  });

  const { values } = formik;

  // Countdown timer for resending OTP
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
      initialValues={initialValues} // Make sure to set initialValues here
      validationSchema={validationSchema}
      onSubmit={handleOnSubmit}
    >
      {({ handleSubmit, values, errors, touched, handleChange }) => (
        <Form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "95vh",
            }}
          >
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
                  name="mobileNumber"
                  value={values.mobileNumber} // Make sure to set value from Formik
                  onChange={handleChange} // Handle change using Formik
                  helperText={
                    touched.mobileNumber && errors.mobileNumber
                      ? errors.mobileNumber
                      : ""
                  }
                  disabled={otpSent}
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
                    otpSent
                      ? handleSubmit()
                      : sendOtpMutation.mutate({
                          mobileNumber: values.mobileNumber,
                        });
                  }}
                  disabled={
                    otpSent
                      ? otpValues.some((value) => value === "")
                      : values.mobileNumber.length !== 10
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
                    onClick={() =>
                      sendOtpMutation.mutate({
                        mobileNumber: values.mobileNumber,
                      })
                    }
                    disabled={timer > 0}
                    sx={{ mt: 1, textTransform: "none" }}
                  >
                    {timer > 0
                      ? `Resend OTP in ${timer} seconds`
                      : "Resend OTP"}
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default LoginOTP;
