import React, { useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import logo from "../../assets/logo.png";
import { ExamContext } from "../../atseContext/ExamProvider";
import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback";
import Header from "../Header";

const ScoreCard = ({ userDetails }) => {
  const { userData } = useContext(ExamContext);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90.8vh",
        backgroundColor: "#000036",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <Header />
      <Box>
        <Box
          sx={{
            width: {
              lg: "100%",
              md: "100%",
              sm: "100%",
              xs: "100%",
            },
            padding: 2,
            border: "1px solid #D9D9D9",
            borderRadius: 2,
            backgroundColor: "#ffffff",
          }}
          data-aos="zoom-in"
        >
          <Typography textAlign="center" sx={{ color: "#000036" }} variant="h5">
            Thank You for Attending The ATSE Exam.
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
              <Typography variant="body2">Name: {userData.name}</Typography>
              <Typography variant="body2">Class: {userData.class}</Typography>
              <Typography variant="body2">Stream: {userData.stream}</Typography>
              <Typography variant="body2">Board: {userData.board}</Typography>
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <img src={logo} width="60%" height="100%" alt="aakarsh logo" />
            </Box>
          </Box>
          <Box>
            {/* Greeting Message */}
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", marginBottom: 2, color: "#0927eb" }}
            >
              🎉 Congratulations, {userData.name} ! You have qualified for this
              scholarship 🎉
              {/* 🎉 Congratulations, Sufyan! You have qualified for this
              scholarship 🎉 */}
            </Typography>

            {/* <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6">Exam Results</Typography>
          <Typography variant="body1">Score: 15 / 30</Typography>
          <Typography variant="body1">Percentage: 50%</Typography>
        </Box> */}

            {/* Scholarship Percentage */}
            {/* <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6">Scholarship</Typography>
          <Typography variant="body1">
            You have Pass the Scholarship Test
          </Typography>
        </Box> */}

            {/* Institute Contact Message */}
            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="body2">
                Please contact the institute for more information on your
                scholarship and admission process.
              </Typography>
            </Box>

            <Box
              sx={{
                width: { lg: "280px", md: "150px", sm: "150px", xs: "100%" },
                //   border: "solid red",
                display: { lg: "block", md: "block", sm: "flex", xs: "flex" },
                justifyContent: {
                  lg: "none",
                  md: "none",
                  sm: "center",
                  xs: "center",
                },
                paddingTop: { lg: "0px", md: "0px", sm: "7px", xs: "7px" },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <PhoneCallbackIcon sx={{ color: "lightgreen" }} />
                Pune Branch &nbsp;&nbsp;&nbsp;: &nbsp;+91 8087379064 <br />{" "}
                Nagpur Branch : &nbsp;+91 8956781560
                <br />
                Call Time
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp; 10
                am to 08 pm
              </Typography>
            </Box>

            {/* Download Brochure Button */}
            <Button
              variant="contained"
              sx={{
                marginTop: 2,
                textTransform: "none",
                backgroundColor: "#000036",
              }}
              href="/dummy.pdf"
              download="Aakarsh Career Institute Private Limited Brochure.pdf"
            >
              Download Brochure
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ScoreCard;
