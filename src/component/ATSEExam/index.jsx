import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import logo from "../../assets/logo.png";
import ConfirmationDialog from "../ConfirmationDialog";
import { ExamContext } from "../../atseContext/ExamProvider";
import { useMutation } from "@tanstack/react-query";
import { examAttempt, examDataById } from "../../api/AtseExam";

const ATSEExam = ({ userDetails, setOpen }) => {
  const { userData } = useContext(ExamContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [examDialog, setExamDialog] = useState(false);
  const [confirmExam, setConfirmExam] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [currentData, setCurrentData] = useState({});

  // Mutation for fetching exam data
  const examDataByIdMutation = useMutation({
    mutationFn: (payload) => examDataById(payload),
    onSuccess: (data) => {
      console.log("Exam Data:", data);
      setCurrentData(data.data); // Set currentData with fetched data
      if (data.data.duration) {
        setTimeLeft(data.data.duration * 60); // Set timer based on exam duration
      }
    },
    onError: (error) => {
      console.error("Error fetching exam data:", error);
    },
  });

  // Mutation for submit exam data
  const examSubmitMutation = useMutation({
    mutationFn: (payload) => examAttempt(payload),
    onSuccess: (data) => {
      console.log("Exam Submit", data);
      setOpen("score-card");
    },
    onError: (error) => {
      console.error("Error fetching exam data:", error);
      setOpen("login");
    },
  });

  // Fetch exam data when component mounts
  useEffect(() => {
    if (userData.select_exam) {
      const payload = { examName: userData.select_exam };
      examDataByIdMutation.mutate(payload);
    }
  }, [userData.select_exam]);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (!isSubmitted) {
      handleSubmit();
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

  // Handle answer change
  const handleAnswerChange = (event) => {
    const { value } = event.target;
    const questionId = currentData.questions[currentQuestion]._id;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  // Navigate to next question
  const handleNextQuestion = () => {
    setCurrentQuestion((prev) =>
      prev + 1 < currentData.questions.length ? prev + 1 : prev
    );
  };

  // Navigate to previous question
  const handlePrevQuestion = () => {
    setCurrentQuestion((prev) => (prev > 0 ? prev - 1 : prev));
  };

  // Submit answers
  const handleSubmit = () => {
    if (!isSubmitted) {
      setIsSubmitted(true);
    }
    const answersArray = Object.entries(selectedAnswers).map(
      ([questionId, selectedOption]) => ({
        questionId,
        selectedOption,
      })
    );

    const payload = {
      studentId: userData._id,
      examName: currentData.examName,
      answers: answersArray,
    };

    console.log("Payload:", payload);
    // Use payload for API request
    examSubmitMutation.mutate(payload);
  };

  const handleConfirmExam = () => {
    setConfirmExam(true);
    setIsSubmitted(true);
    handleSubmit();
    setExamDialog(false);
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
        {currentData?.title}
      </Typography>
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
          <Typography variant="body2">Name: {userData.name}</Typography>
          <Typography variant="body2">Class: {userData.class}</Typography>
          <Typography variant="body2">Stream: {userData.stream}</Typography>
          <Typography variant="body2">
            Exam Name: {userData.select_exam}
          </Typography>
          <Typography variant="body2">
            Total Question: {currentData.totalQuestions}
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
        {/* Render Questions */}
        <Box>
          {currentData.questions ? (
            currentData.questions.map((question, index) => (
              <Box key={question._id}>
                <Typography
                  variant="h6"
                  display="inline-flex"
                  alignItems="center"
                >
                  Q {index + 1}:{" "}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: question.question,
                    }}
                  />
                </Typography>
                <RadioGroup
                  name={`question-${index}`}
                  value={selectedAnswers[question._id] || ""}
                  onChange={handleAnswerChange}
                >
                  {question.options.map((option, idx) => (
                    <FormControlLabel
                      key={idx}
                      value={option.replace(/<[^>]*>/g, "")}
                      control={<Radio />}
                      label={
                        <span
                          dangerouslySetInnerHTML={{
                            __html: option,
                          }}
                        />
                      }
                    />
                  ))}
                </RadioGroup>
              </Box>
            ))
          ) : (
            <Typography>Loading questions...</Typography>
          )}
        </Box>

        <Box sx={{ textAlign: "right", marginBottom: 2 }}>
          <Typography variant="body1">
            Time Left: {formatTime(timeLeft)}
          </Typography>
        </Box>
      </Box>

      {/* Navigation Buttons */}
      <Box
        sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}
      >
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
          disabled={currentQuestion >= (currentData.questions?.length || 0) - 1}
          sx={{ textTransform: "none" }}
        >
          Next
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleConfirmExam}
          sx={{ textTransform: "none" }}
        >
          Submit
        </Button>
      </Box>

      {examDialog && (
        <ConfirmationDialog
          open={examDialog}
          handleClose={() => setExamDialog(false)}
          handleSubmit={handleConfirmExam}
          message="Are you sure you want to submit the exam?"
        />
      )}
    </Box>
  );
};

export default React.memo(ATSEExam);
