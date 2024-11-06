import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import LoginOTP from "../../component/LoginOTP";
import logo from "../../assets/LogoAakarsh.png";
import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback";

const Login = ({ setOpen }) => {
  const isSm = useMediaQuery("(max-width:600px)");
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#016cb4",
        padding: {
          lg: "0px 60px",
          md: "0px 60px",
          sm: "0px 10px",
          xs: "0px 10px",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: {
              lg: "300px",
              md: "300px",
              sm: "200px",
              xs: "180px",
            },
            height: { lg: "250px", md: "250px", sm: "250px", xs: "150px" },
          }}
        >
          <img src={logo} alt="logo" width="100%" height="100%" />
        </Box>
        <Box
          sx={{
            width: { lg: "200px", md: "150px", sm: "150px", xs: "160px" },
          }}
        >
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "white",
            }}
          >
            <PhoneCallbackIcon />
            +91 8087379064 <br /> +91 8956781560
          </Typography>
        </Box>
      </Box>
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
            }}
          >
            {isSm ? (
              <Typography
                variant="h6"
                sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}
              >
                iACST
              </Typography>
            ) : (
              <Typography
                variant="h4"
                sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}
              >
                iACST
              </Typography>
            )}

            <Typography
              variant="h6"
              sx={{ color: "white", fontWeight: "bold" }}
            >
              (Aakarsh Scholarship Test)
            </Typography>
          </Box>
          <Typography
            variant="h4"
            sx={{ color: "#f8e50d", fontWeight: "bold", mt: 1 }}
          >
            Up to 90% Total Scholarship
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
