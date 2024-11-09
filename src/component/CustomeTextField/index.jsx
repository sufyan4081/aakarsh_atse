import {
  Autocomplete,
  Box,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Field } from "formik";

export const CustomTextField = ({
  type,
  label,
  name,
  placeholder,
  helperText,
  disabled,
}) => {
  // Get today's date in 'YYYY-MM-DD' format for setting as minimum date
  const today = new Date().toISOString().split("T")[0];

  return (
    <Box sx={{ height: "65px" }}>
      <Field
        type={type}
        id="outlined-basic"
        label={label}
        variant="outlined"
        as={TextField}
        size="small"
        disabled={disabled}
        fullWidth
        name={name}
        placeholder={type !== "date" ? placeholder : undefined} // Hide placeholder if type is 'date'
        inputProps={
          type === "date" ? { max: today } : {} // Restrict future dates if type is 'date'
        }
        autoComplete="off"
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
};
