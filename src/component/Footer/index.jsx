import { Box, Link } from "@mui/material";
import React from "react";
const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#000036",
        padding: "20px",
        textAlign: "center",
        borderTop: {
          lg: "1px solid white",
          md: "1px solid white",
          sm: "none",
          xs: "none",
        },
      }}
    >
      {/* Official Web Link */}
      <Link
        href="https://aakarshcareer.com/"
        sx={{ color: "white", textDecoration: "none" }}
      >
        Aakarsh Career Institute Private Limited
      </Link>
    </Box>
  );
};

export default Footer;
