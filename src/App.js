import React, { useState, useEffect } from "react";
import LoginOTP from "./component/LoginOTP";
import { Box } from "@mui/material";
import UserDetail from "./component/UserDetail";
import ATSEExam from "./component/ATSEExam";
import { questions, userDetails } from "./data";
import ScoreCard from "./component/ScoreCard";

const App = () => {
  const [open, setOpen] = useState("login");
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ""; // Required for the browser's built-in dialog to work
    };

    // Add the event listener when the component mounts
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
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

      {/* <UserDetail setOpen={setOpen} /> */}
    </Box>
  );
};

export default App;
