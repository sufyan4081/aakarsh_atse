import { Avatar, Box, Button, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { CustomTextField } from "../CustomeTextField";
import { Slide, toast } from "react-toastify";
import logo from "../../assets/logo.png";
import { CustomSelectField } from "../CustomSelectField";
import {
  boardData,
  branchData,
  classData,
  examData,
  streamData,
} from "../../data";
import ConfirmationDialog from "../ConfirmationDialog";
const UserDetail = ({ setOpen }) => {
  const [examDialog, setExamDialog] = useState(false);
  const [confirmExam, setConfirmExam] = useState(false);

  const handleExamDialogOpen = () => {
    setExamDialog(true);
  };
  const handleExamDialogClose = () => {
    setExamDialog(false);
  };

  const initialValues = {
    name: "",
    fatherName: "",
    email: "",
    dob: "",
    board: "",
    class: "",
    stream: "",
    exam: "",
    branch: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    fatherName: Yup.string().required("Father name is required"),
    dob: Yup.string().required("DOB is required"),
    board: Yup.string().required("Board is required"),
    class: Yup.string().required("Class is required"),
    stream: Yup.string().required("Stream is required"),
    exam: Yup.string().required("Exam is required"),
    branch: Yup.string().required("Branch is required"),
  });

  // exam starting
  const handleSubmit = () => {
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
    setOpen("exam");
  };

  const handleConfirmExam = () => {
    setConfirmExam(true);
    handleSubmit();
    handleExamDialogClose();
  };

  return (
    <>
      <Formik initialValues={initialValues} validationSchema={validationSchema}>
        {({ values, errors, touched, setFieldValue }) => (
          <Form
            style={{
              width: "100vw",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                border: "1px solid #D9D9D9",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "auto",
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
                  User Details
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
                  label="Enter Name"
                  name="name"
                  helperText={touched.name && errors.name ? errors.name : ""}
                />
                <Box sx={{ display: "flex", gap: 2 }}>
                  <CustomTextField
                    label="Enter Father Name"
                    name="fatherName"
                    helperText={
                      touched.fatherName && errors.fatherName
                        ? errors.fatherName
                        : ""
                    }
                  />
                  <CustomTextField
                    label="Enter Email Id"
                    name="email"
                    helperText={
                      touched.email && errors.email ? errors.email : ""
                    }
                  />
                </Box>
                <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
                  <Box sx={{ width: "100%" }}>
                    <CustomTextField
                      type="date"
                      label="Enter DOB"
                      name="dob"
                      helperText={touched.dob && errors.dob ? errors.dob : ""}
                    />
                    <CustomSelectField
                      label="Stream"
                      name="stream"
                      options={streamData}
                      helperText={
                        touched.stream && errors.stream ? errors.stream : ""
                      }
                    />
                  </Box>
                  <Box sx={{ width: "100%" }}>
                    <CustomSelectField
                      label="Board"
                      name="board"
                      options={boardData}
                      helperText={
                        touched.board && errors.board ? errors.board : ""
                      }
                    />
                    <CustomSelectField
                      label="Class"
                      name="class"
                      options={classData}
                      helperText={
                        touched.class && errors.class ? errors.class : ""
                      }
                    />
                  </Box>
                </Box>

                <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
                  <Box sx={{ width: "100%" }}>
                    <CustomSelectField
                      label="Exam"
                      name="exam"
                      options={examData}
                      helperText={
                        touched.exam && errors.exam ? errors.exam : ""
                      }
                    />
                  </Box>
                  <Box sx={{ width: "100%" }}>
                    <CustomSelectField
                      label="Branch"
                      name="branch"
                      options={branchData}
                      helperText={
                        touched.branch && errors.branch ? errors.branch : ""
                      }
                    />
                  </Box>
                </Box>

                <Button
                  onClick={handleExamDialogOpen}
                  size="medium"
                  variant="contained"
                >
                  Start Exam
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
      {examDialog && (
        <ConfirmationDialog
          open={examDialog}
          handleClose={handleExamDialogClose}
          handleSubmit={handleConfirmExam}
          message="Are you sure you want to start the exam?"
        />
      )}
    </>
  );
};

export default UserDetail;
