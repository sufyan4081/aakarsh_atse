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
  <Box sx={{ minHeight: "65px", width: "100%", overflow: "hidden" }}>
    <Field
      as={Select}
      name={name}
      fullWidth
      displayEmpty
      variant="outlined"
      size="small"
      sx={{
        marginTop: "2px",
        maxWidth: "100%", // Set a maximum width
        overflow: "hidden", // Hide overflow content
        textOverflow: "ellipsis", // Add ellipsis for overflowing text
        whiteSpace: "nowrap", // Prevent text from wrapping
      }}
    >
      <MenuItem value="" disabled>
        {`Select ${label}`}
      </MenuItem>
      {options && options.length > 0 ? (
        options.map((option, index) => (
          <StyledMenuItem key={option.value} value={option.value}>
            <span
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {option.name}
            </span>
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
