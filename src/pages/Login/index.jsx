import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import LoginOTP from "../../component/LoginOTP";
import logo from "../../assets/LogoAakarsh.png";
import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback";
import Footer from "../../component/Footer";
import Header from "../../component/Header";

const Login = ({ setOpen }) => {
  const isSm = useMediaQuery("(max-width:600px)");
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "90.8vh",
        width: "100%",
        backgroundColor: "#000036",
        padding: {
          lg: "0px 60px",
          md: "0px 60px",
          sm: "0px 10px",
          xs: "0px 10px",
        },
        // border: "solid red",
      }}
    >
      {/* header */}
      <Header />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { lg: "left", md: "left", sm: "center", xs: "center" },
          width: "100%",
          flexDirection: { lg: "row", md: "row", sm: "column", xs: "column" },
        }}
        data-aos="fade-right"
      >
        <Box
          sx={{
            textAlign: { lg: "left", md: "left", sm: "center", xs: "center" },
            mb: { lg: 0, md: 0, sm: 3, xs: 3 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: {
                lg: "left",
                md: "left",
                sm: "center",
                xs: "center",
              },
              // border: "solid",
              width: "100%",
            }}
          >
            {isSm ? (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  ATSE
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  ( Aakarsh Talent Search Examination)
                </Typography>
              </Box>
            ) : (
              <>
                <Typography
                  variant="h5"
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  ATSE
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  ( Aakarsh Talent Search Examination)
                </Typography>
              </>
            )}
          </Box>
          <Typography
            variant="h4"
            sx={{ color: "#f8e50d", fontWeight: "bold", mt: 1 }}
          >
            Up to 100% Total Scholarship
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "white", fontWeight: "bold", mt: 1 }}
          >
            NEET, JEE, Foundation Course
          </Typography>
          <Typography sx={{ color: "white", mt: 1 }}>
            For 8<sup>th</sup> to 12<sup>th</sup> studying & 12<sup>th</sup>{" "}
            Passed students
          </Typography>
          <Typography
            variant="h5"
            sx={{ color: "#f8e50d", fontWeight: "bold", mt: 2 }}
          >
            REGISTRATION OPEN
          </Typography>
        </Box>
        <Box data-aos="fade-left">
          <LoginOTP setOpen={setOpen} />
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
