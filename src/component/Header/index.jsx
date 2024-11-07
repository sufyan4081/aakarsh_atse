import { Box, Typography } from "@mui/material";
import React from "react";
import logo from "../../assets/LogoAakarsh.png";
import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback";
const Header = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        // border: "solid",
        flexDirection: { lg: "row", md: "row", sm: "column", xs: "column" },
      }}
    >
      <Box
        sx={{
          width: {
            lg: "250px",
            md: "300px",
            sm: "200px",
            xs: "180px",
          },
          //   border: "solid",
          height: { lg: "60px", md: "250px", sm: "250px", xs: "40px" },
        }}
      >
        <img src={logo} alt="logo" width="100%" height="100%" />
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
          color="textSecondary"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "white",
          }}
        >
          <PhoneCallbackIcon sx={{ color: "lightgreen" }} />
          Pune Branch &nbsp;&nbsp;&nbsp;: &nbsp;+91 8087379064 <br /> Nagpur
          Branch : &nbsp;+91 8956781560
          <br />
          Call Time
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp; 10 am to
          08 pm
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;
