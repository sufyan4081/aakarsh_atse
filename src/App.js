import React, { useState, useEffect } from "react";
import LoginOTP from "./component/LoginOTP";
import { Box } from "@mui/material";
import UserDetail from "./component/UserDetail";
import ATSEExam from "./component/ATSEExam";
import { questions, userDetails } from "./data";
import ScoreCard from "./component/ScoreCard";
import Login from "./pages/Login";
import "./App.css";
import AOS from "aos";
import "aos/dist/aos.css"; // Import the AOS CSS file

const App = () => {
  const [open, setOpen] = useState("login");

  useEffect(() => {
    AOS.init({
      duration: 2000, // Animation duration in milliseconds
      once: true, // Whether animation should happen only once
    });
  }, []);

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
        overflowX: "hidden",
      }}
    >
      {
        open === "login" ? (
          <Login setOpen={setOpen} />
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
      {/* <ScoreCard userDetails={userDetails} /> */}
      {/* <Login setOpen={setOpen} /> */}
    </Box>
  );
};

export default App;
