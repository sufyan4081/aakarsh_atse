import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import logo from "../../assets/logo.png";
import { Slide, toast } from "react-toastify";
import ConfirmationDialog from "../ConfirmationDialog";
import { ExamContext } from "../../atseContext/ExamProvider";
import { useMutation } from "@tanstack/react-query";
import { examDataById } from "../../api/AtseExam";

const ATSEExam = ({ questions, userDetails, setOpen }) => {
  const { examNameData } = useContext(ExamContext);
  console.log("examNameData", examNameData);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [examDialog, setExamDialog] = useState(false);
  const [confirmExam, setConfirmExam] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // New state to track submission status
  const [timeLeft, setTimeLeft] = useState(examNameData.duration * 60); // 30 minutes in
  const [currentData, setCurrentData] = useState("");
  const handleExamDialogOpen = () => {
    setExamDialog(true);
  };
  const handleExamDialogClose = () => {
    setExamDialog(false);
  };

  // Mutation for fetching exam data
  const examDataByIdMutation = useMutation({
    mutationFn: (payload) => examDataById(payload),
    onSuccess: (data) => {
      console.log("Exam Data:", data); // Log the fetched exam data
      setCurrentData(data.data);
    },
    onError: (error) => {
      console.error("Error fetching exam data:", error);
    },
  });

  console.log("currentData", currentData);
  // Fetch exam data when component mounts
  useEffect(() => {
    if (examNameData) {
      examDataByIdMutation.mutate(examNameData);
    }
  }, [examNameData]); // Dependency array ensures this runs on mount and when examNameData changes

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer); // Cleanup on component unmount
    } else {
      // Trigger submission only once when timer hits 0
      if (!isSubmitted) {
        handleSubmit();
      }
    }
  }, [timeLeft, isSubmitted]);

  // Format time in mm:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  // Handle answer selection
  const handleAnswerChange = (e) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: e.target.value,
    });
  };

  // Navigate to next question
  const handleNextQuestion = () => {
    setCurrentQuestion((prev) =>
      prev + 1 < questions.length ? prev + 1 : prev
    );
  };

  // Navigate to previous question
  const handlePrevQuestion = () => {
    setCurrentQuestion((prev) => (prev > 0 ? prev - 1 : prev));
  };

  // Submit answers
  const handleSubmit = () => {
    // Mark as submitted
    if (!isSubmitted) {
      setIsSubmitted(true);
      examDataByIdMutation.mutate(examNameData);
    }
    // console.log("Selected Answers:", selectedAnswers);
    setOpen("score-card");
  };

  const handleConfirmExam = () => {
    setConfirmExam(true);
    setIsSubmitted(true);
    handleSubmit();
    handleExamDialogClose();
  };

  return (
    <Box
      sx={{
        width: { lg: "50%", md: "100%", sm: "100%", xs: "100%" },
        padding: 2,
        border: "1px solid #D9D9D9",
        borderRadius: 2,
      }}
    >
      <Typography textAlign="center" variant="h5">
        {examNameData?.title}
      </Typography>
      {/* User Information */}
      <Box
        sx={{
          padding: 1,
          borderBottom: "1px solid #ddd",
          marginBottom: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Typography variant="h6">User Information</Typography>
          <Typography variant="body2">Name: {userDetails.name}</Typography>
          <Typography variant="body2">Class: {userDetails.class}</Typography>
          <Typography variant="body2">Stream: {userDetails.stream}</Typography>
          <Typography variant="body2">
            Exam Name: {examNameData.examName}
          </Typography>
        </Box>
        <Box sx={{ textAlign: "right" }}>
          <img src={logo} width="60%" height="100%" alt="aakarsh logo" />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: {
            lg: "row",
            md: "row",
            sm: "column-reverse",
            xs: "column-reverse",
          },
          paddingTop: "10px",
        }}
      >
        {/* Question Display */}
        <Box>
          <Typography variant="h6">
            Q {currentQuestion + 1}: {questions[currentQuestion].question}
          </Typography>
          <RadioGroup
            name={`question-${currentQuestion}`}
            value={selectedAnswers[currentQuestion] || ""}
            onChange={handleAnswerChange}
          >
            {questions[currentQuestion].options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
        </Box>

        {/* Timer */}
        <Box
          sx={{
            textAlign: "right",
            marginBottom: 2,
          }}
        >
          <Typography variant="body1">
            Time Left: {formatTime(timeLeft)}
          </Typography>
        </Box>
      </Box>

      {/* Navigation Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 2,
          textTransform: "none",
        }}
      >
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePrevQuestion}
            disabled={currentQuestion === 0}
            sx={{ textTransform: "none", marginRight: 1.5 }}
          >
            Prev
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextQuestion}
            disabled={currentQuestion >= questions.length - 1}
            sx={{ textTransform: "none" }}
          >
            Next
          </Button>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleExamDialogOpen}
          sx={{ textTransform: "none" }}
        >
          Submit
        </Button>
      </Box>

      {examDialog && (
        <ConfirmationDialog
          open={examDialog}
          handleClose={handleExamDialogClose}
          handleSubmit={handleConfirmExam}
          message="Are you sure you want to submit the exam?"
        />
      )}
    </Box>
  );
};

export default React.memo(ATSEExam);
