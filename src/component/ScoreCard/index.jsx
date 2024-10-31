import React from "react";
import { Box, Button, Typography } from "@mui/material";
import logo from "../../assets/logo.png";

const ScoreCard = ({ userDetails }) => {
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
        Score Card
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
        </Box>
        <Box sx={{ textAlign: "right" }}>
          <img src={logo} width="60%" height="100%" alt="aakarsh logo" />
        </Box>
      </Box>
      <Box>
        {/* Greeting Message */}
        <Typography
          variant="h6"
          color="primary"
          sx={{ fontWeight: "bold", marginBottom: 2 }}
        >
          🎉 Congratulations, {userDetails.name}! 🎉
        </Typography>

        {/* <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6">Exam Results</Typography>
          <Typography variant="body1">Score: 15 / 30</Typography>
          <Typography variant="body1">Percentage: 50%</Typography>
        </Box> */}

        {/* Scholarship Percentage */}
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6">Scholarship</Typography>
          <Typography variant="body1">Scholarship Awarded: 35%</Typography>
        </Box>

        {/* Institute Contact Message */}
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="body2" color="textSecondary">
            Please contact the institute for more information on your
            scholarship and admission process.
          </Typography>
        </Box>

        {/* Download Brochure Button */}
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 2, textTransform: "none" }}
          href="/dummy.pdf"
          download="Aakarsh Career Institute Private Limited Brochure.pdf"
        >
          Download Brochure
        </Button>
      </Box>
    </Box>
  );
};

export default ScoreCard;
