import { Box, Select, MenuItem, Typography } from "@mui/material";
import { Field } from "formik";

export const CustomSelectField = ({
  label,
  name,
  options,
  placeholder,
  helperText,
}) => (
  <Box sx={{ minHeight: "65px" }}>
    <Field
      as={Select}
      name={name}
      fullWidth
      displayEmpty
      variant="outlined"
      size="small"
      sx={{ marginTop: "2px" }}
    >
      <MenuItem value="" disabled>
        {`Select ${label}`}
      </MenuItem>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.name}
        </MenuItem>
      ))}
    </Field>
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
