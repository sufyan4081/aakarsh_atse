import { Avatar, Box, Button, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { CustomTextField } from "../CustomeTextField";
import logo from "../../assets/logo.png";
import { CustomSelectField } from "../CustomSelectField";
import ConfirmationDialog from "../ConfirmationDialog";
import { useQuery } from "@tanstack/react-query";
import { getBoard } from "../../api/board";
import { queryKey } from "../../utils/queryKey";
import { getStream } from "../../api/stream";
import { getClass } from "../../api/class";
import { getBranch } from "../../api/branch";
import { ExamContext } from "../../atseContext/ExamProvider";
import { api } from "../../api/axiosInstance";
import { Slide, toast } from "react-toastify";
import Header from "../Header";
import { examData } from "../../data";

const UserDetail = ({ setOpen }) => {
  const { mobileNumber, setUserData, userData } = useContext(ExamContext);
  const [examDialog, setExamDialog] = useState(false);
  const [formValues, setFormValues] = useState(null); // State to store form values before confirmation

  const handleExamDialogOpen = () => {
    setExamDialog(true);
  };

  const handleExamDialogClose = () => {
    setExamDialog(false);
    setFormValues(null); // Reset form values on close
  };

  const initialValues = {
    name: userData?.name || "",
    parentPhoneNumber: userData?.parentPhoneNumber || "",
    father_name: userData?.father_name || "",
    email: userData?.email || "",
    phoneNumber: mobileNumber || "",
    dob: userData?.dob || "",
    board: userData?.board || "",
    class: userData?.class || "",
    stream: userData?.stream || "",
    select_exam: userData?.select_exam || "",
    branch: userData?.branch || "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Full name is required"),
    email: Yup.string().email().required("Email is required"),
    father_name: Yup.string().required("Father name is required"),
    dob: Yup.string().required("DOB is required"),
    board: Yup.string().required("Board is required"),
    class: Yup.string().required("Class is required"),
    stream: Yup.string().required("Stream is required"),
    select_exam: Yup.string().required("Exam is required"),
    branch: Yup.string().required("Branch is required"),
  });

  const handleUserForm = async (values) => {
    try {
      const res = await api.post("/registration_rec/create", values);

      if (res.status === 201) {
        setUserData(res.data.data);

        toast.success("Registration Successful!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          transition: Slide,
        });
        return res.data.data;
      }
    } catch (error) {
      // Check if the error has a response
      if (error.response) {
        const errorMessage = error.response.data.message || "An error occurred";
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
      } else {
        toast.error("Network error or request timeout", {
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
      return null;
    }
  };

  const handleOnSubmit = async (values) => {
    // Await user form handling and get the exam data
    if (!userData) {
      const registrationData = await handleUserForm(values);
      if (registrationData) {
        // Pass the exam data directly to handleExamCheck
        const examCheckSuccess = await handleExamCheck(values);

        if (examCheckSuccess) {
          setOpen("exam");
          handleExamDialogClose(); // Close dialog only if exam check is successful
        } else {
          handleExamDialogClose();
        }
      }
    } else {
      // Pass the exam data directly to handleExamCheck
      const examCheckSuccess = await handleExamCheck(values);
      if (examCheckSuccess) {
        setOpen("exam");
        handleExamDialogClose(); // Close dialog only if exam check is successful
      } else {
        handleExamDialogClose();
      }
    }
  };
  const handleExamCheck = async (values) => {
    try {
      const payload = {
        examName: values.select_exam,
      };

      const res = await api.post("/paperFormat/getbyexamName", payload);

      if (res.status === 200) {
        // Exam found successfully
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
        return true; // Indicate success
      }
    } catch (error) {
      // Check if the error has a response
      if (error.response) {
        const errorMessage = error.response.data.message || "An error occurred";
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
      } else {
        toast.error("Network error or request timeout", {
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
      console.error("API Error:", error);
    }
    return false; // Indicate failure
  };

  const { data: boardData } = useQuery({
    queryKey: queryKey.board,
    queryFn: getBoard,
  });

  const boardOptions = boardData?.data.map((b) => ({
    value: b.name,
    name: b.name,
    image: b.boardImage,
  }));

  const { data: streamData } = useQuery({
    queryKey: queryKey.stream,
    queryFn: getStream,
  });

  const streamOptions = streamData?.data.map((b) => ({
    value: b.stream,
    name: b.stream,
    image: b.streamImage,
  }));

  const { data: classData } = useQuery({
    queryKey: queryKey.class,
    queryFn: getClass,
  });

  const classOptions = classData?.data
    .map((cl) => ({
      value: cl.class,
      name: cl.class,
    }))
    .sort((a, b) => a.value - b.value); // Sort classes numerically

  // const { data: examData } = useQuery({
  //   queryKey: queryKey.exam,
  //   queryFn: getExam,
  // });

  const examOptions = examData?.map((b) => ({
    value: b.value,
    name: b.name,
    // image: b.image,
  }));

  const { data: branchData } = useQuery({
    queryKey: queryKey.branch,
    queryFn: getBranch,
  });

  const branchOptions = branchData?.data.map((b) => ({
    value: b.branchName,
    name: b.branchName,
    image: b.imageUrl,
  }));

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnMount={true}
        onSubmit={(values) => {
          setFormValues(values); // Store values before opening the dialog

          handleExamDialogOpen(); // Open the dialog
        }}
      >
        {({ errors, touched, handleSubmit, values }) => {
          return (
            <Form style={{ width: "100%", backgroundColor: "#000036" }}>
              <Box
                sx={{
                  maxWidth: "100%",
                  height: "90.8vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
                data-aos="zoom-in"
              >
                <Header />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: {
                      lg: "500px",
                      md: "500px",
                      sm: "400px",
                      xs: "350px",
                    },
                    borderRadius: "12px",
                    padding: "12px",
                    backgroundColor: "#ffffff",
                    mt: 2,
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
                      User Details
                    </Typography>
                    <Avatar alt="Aakarsh" src={logo} />
                  </Box>

                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <CustomTextField
                        label="Enter Full Name"
                        name="name"
                        helperText={
                          touched.name && errors.name ? errors.name : ""
                        }
                        disabled={userData?.name}
                      />
                      <CustomTextField
                        label="Enter Parent Mobile Number"
                        name="parentPhoneNumber"
                        helperText={
                          touched.parentPhoneNumber && errors.parentPhoneNumber
                            ? errors.parentPhoneNumber
                            : ""
                        }
                        disabled={userData?.parentPhoneNumber}
                      />
                    </Box>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Box width="100%">
                        <CustomTextField
                          label="Enter Father Name"
                          name="father_name"
                          helperText={
                            touched.father_name && errors.father_name
                              ? errors.father_name
                              : ""
                          }
                          disabled={userData?.father_name}
                        />
                      </Box>
                      <Box width="100%">
                        <CustomTextField
                          label="Enter Email Id"
                          name="email"
                          helperText={
                            touched.email && errors.email ? errors.email : ""
                          }
                          disabled={userData?.email}
                        />
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Box width="100%">
                        <CustomTextField
                          type="date"
                          label="Enter DOB"
                          name="dob"
                          helperText={
                            touched.dob && errors.dob ? errors.dob : ""
                          }
                          disabled={userData?.dob}
                        />
                      </Box>
                      <Box width="100%">
                        <CustomSelectField
                          label="Stream"
                          name="stream"
                          options={streamOptions}
                          helperText={
                            touched.stream && errors.stream ? errors.stream : ""
                          }
                          disabled={userData?.stream}
                        />
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <CustomSelectField
                        label="Board"
                        name="board"
                        options={boardOptions}
                        helperText={
                          touched.board && errors.board ? errors.board : ""
                        }
                        disabled={userData?.board}
                      />
                      <CustomSelectField
                        label="Class"
                        name="class"
                        options={classOptions}
                        helperText={
                          touched.class && errors.class ? errors.class : ""
                        }
                        disabled={userData?.class}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        width: "100%",
                        overflow: "hidden", // Hide overflow content
                      }}
                    >
                      <CustomSelectField
                        label="Exam"
                        name="select_exam"
                        options={examOptions}
                        helperText={
                          touched.select_exam && errors.select_exam
                            ? errors.select_exam
                            : ""
                        }
                        disabled={userData?.select_exam}
                      />
                      <CustomSelectField
                        label="Branch"
                        name="branch"
                        options={branchOptions}
                        helperText={
                          touched.branch && errors.branch ? errors.branch : ""
                        }
                        disabled={userData?.branch}
                      />
                    </Box>

                    <Button
                      onClick={handleSubmit} // Trigger Formik's handleSubmit
                      size="medium"
                      variant="contained"
                      type="button"
                      sx={{ backgroundColor: "#000036" }}
                    >
                      Start Exam
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Form>
          );
        }}
      </Formik>

      {examDialog && (
        <ConfirmationDialog
          open={examDialog}
          onClose={handleExamDialogClose}
          onConfirm={() => {
            if (formValues) {
              handleOnSubmit(formValues); // Pass confirmed form values
            }
          }}
          title="Confirm Exam"
          message="Are you sure you want to start the exam?"
        />
      )}
    </>
  );
};

export default UserDetail;
