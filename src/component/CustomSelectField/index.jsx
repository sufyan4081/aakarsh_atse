import { Box, Select, MenuItem, Typography, styled } from "@mui/material";
import { Field } from "formik";

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const Image = styled("img")({
  objectFit: "cover",
  width: "20px",
  height: "20px",
  marginRight: "8px",
  crossOrigin: "anonymous",
});

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
      {options && options.length > 0 ? (
        options?.map((option, index) => (
          <StyledMenuItem key={option.value} value={option.value}>
            {option.name} {option[name]}
            {option.image && (
              <Image
                src={`${option.image}`}
                alt="no image"
                crossOrigin="anonymous"
              />
            )}
          </StyledMenuItem>
        ))
      ) : (
        <MenuItem disabled>No {name} available</MenuItem>
      )}
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
