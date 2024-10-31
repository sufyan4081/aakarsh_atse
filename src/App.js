import React, { useState } from "react";
import LoginOTP from "./component/LoginOTP";
import { Box } from "@mui/material";
import UserDetail from "./component/UserDetail";
import ATSEExam from "./component/ATSEExam";
import { questions, userDetails } from "./data";
import ScoreCard from "./component/ScoreCard";

const App = () => {
  const [open, setOpen] = useState("login");
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {open === "login" ? (
        <LoginOTP setOpen={setOpen} />
      ) : open === "form-details" ? (
        <UserDetail setOpen={setOpen} />
      ) : open === "exam" ? (
        <ATSEExam
          questions={questions}
          userDetails={userDetails}
          setOpen={setOpen}
        />
      ) : (
        <ScoreCard userDetails={userDetails} />
      )}
      {/* <UserDetail setOpen={setOpen} /> */}
      {/* <LoginOTP /> */}
      {/* <ATSEExam questions={questions} userDetails={userDetails} /> */}
      {/* <ScoreCard userDetails={userDetails} /> */}
    </Box>
  );
};

export default App;
