import React, { useState } from "react";
import LoginOTP from "./component/LoginOTP";
import { Box } from "@mui/material";
import UserDetail from "./component/UserDetail";
import ATSEExam from "./component/ATSEExam";
import { questions, userDetails } from "./data";
import ScoreCard from "./component/ScoreCard";

const App = () => {
  const [open, setOpen] = useState("login");
  // const [open, setOpen] = useState("atseExam");

  console.log("open", open);
  return (
    <Box
      sx={{
        width: "100%",
        height: "95vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {
        open === "login" ? (
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
        )

        // open === "atseExam" ? (
        //   <ATSEExam
        //     questions={questions}
        //     userDetails={userDetails}
        //     setOpen={setOpen}
        //   />
        // ) : (
        //   <ScoreCard userDetails={userDetails} />
        // )
      }

      {/* <UserDetail setOpen={setOpen} mobileNumber={mobileNumber} /> */}
    </Box>
  );
};

export default App;
