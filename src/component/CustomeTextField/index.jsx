import { Box, TextField, Typography } from "@mui/material";
import { Field } from "formik";

export const CustomTextField = ({
  type,
  label,
  name,
  placeholder,
  helperText,
}) => (
  <Box sx={{ height: "65px" }}>
    <Field
      type={type}
      id="outlined-basic"
      label={label}
      variant="outlined"
      as={TextField}
      size="small"
      fullWidth
      name={name}
      placeholder={placeholder}
      sx={{ marginTop: "2px" }}
    />
    {helperText && (
      <Typography
        variant="caption"
        color="error"
        sx={{
          display: "block",
          marginTop: "1px",
          ml: 0,
        }}
      >
        {helperText}
      </Typography>
    )}
  </Box>
);
