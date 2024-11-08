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

  console.log("selectedAnswers", selectedAnswers);
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

  const handleExamDialogueClosed = () => {
    setExamDialog(false);
  };

  // Submit answers - update to open the confirmation dialog
  const handleSubmit = () => {
    if (!isSubmitted) {
      setExamDialog(true); // Open the confirmation dialog
    }
  };

  // Handle confirmation from the dialog
  const handleConfirmExam = () => {
    setConfirmExam(true);
    setIsSubmitted(true);

    // Prepare the answers payload for submission
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

    setExamDialog(false); // Close the confirmation dialog
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        mt: 2,
        mb: 2,
        border: "1px solid #D9D9D9",
        borderRadius: "12px",
        padding: "10px",
      }}
    >
      <Box
        sx={{
          maxWidth: "100%",
          height: "100%",
          padding: 2,
          borderRadius: 2,
        }}
      >
        <Box>
          <Typography textAlign="center" variant="h5">
            {currentData?.title}
          </Typography>
        </Box>
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
            alignItems: "flex-start",
            flexDirection: {
              lg: "row",
              md: "row",
              sm: "column-reverse",
              xs: "column-reverse",
            },
            paddingTop: "10px",
            overflow: "hidden", // Prevent overflow
            width: "100%",
          }}
        >
          {/* Render Current Question Only */}
          <Box
            sx={{
              width: { lg: "90%", md: "90", sm: "100%", xs: "100%" },
            }}
          >
            {currentData.questions && currentData.questions[currentQuestion] ? (
              <Box key={currentData.questions[currentQuestion]._id}>
                <Box key={currentData.questions[currentQuestion]._id}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "baseline",
                      // justifyContent: "flex",
                    }}
                  >
                    <Typography
                      sx={{
                        display: "inline-flex", // Inline layout for horizontal arrangement
                        alignItems: "center", // Vertical alignment
                        whiteSpace: "nowrap", // Prevents text from wrapping to a new line
                      }}
                      variant="h6"
                      pr={2} // Adjust padding as necessary
                    >
                      Q {currentQuestion + 1}:
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        display: "inline-flex", // Inline-flex to keep items in one line
                        alignItems: "center",
                        whiteSpace: "normal", // Allow the question text to wrap normally if it's too long
                      }}
                    >
                      <span
                        dangerouslySetInnerHTML={{
                          __html:
                            currentData.questions[currentQuestion].question,
                        }}
                      />
                    </Typography>
                  </Box>
                </Box>

                <RadioGroup
                  name={`question-${currentQuestion}`}
                  value={
                    selectedAnswers[
                      currentData.questions[currentQuestion]._id
                    ] || ""
                  }
                  onChange={handleAnswerChange}
                >
                  {currentData.questions[currentQuestion].options.map(
                    (option, idx) => (
                      <FormControlLabel
                        key={idx}
                        value={option}
                        control={<Radio />}
                        label={
                          <span
                            dangerouslySetInnerHTML={{
                              __html: option,
                            }}
                          />
                        }
                      />
                    )
                  )}
                </RadioGroup>
              </Box>
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
      </Box>
      {/* Navigation Buttons */}
      <Box
        sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}
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
            disabled={
              currentQuestion >= (currentData.questions?.length || 0) - 1
            }
            sx={{ textTransform: "none" }}
          >
            Next
          </Button>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSubmit}
            sx={{ textTransform: "none" }}
          >
            Submit
          </Button>
        </Box>
      </Box>
      {examDialog && (
        <ConfirmationDialog
          open={examDialog}
          onClose={handleExamDialogueClosed}
          onConfirm={handleConfirmExam}
          message="Are you sure you want to submit the exam?"
        />
      )}
    </Box>
  );
};

export default React.memo(ATSEExam);
