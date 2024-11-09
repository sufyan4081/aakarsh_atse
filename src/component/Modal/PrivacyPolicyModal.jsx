import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import ViewModalTitle from "./ViewModalTitle";

const PrivacyPolicyModal = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" data-aos="fade">
      <ViewModalTitle title="T&C and Privacy Policy" />
      <DialogContent sx={{ padding: "16px" }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Information We Collect
        </Typography>

        <Typography variant="body2" paragraph>
          We collect personal information in the course of providing our
          educational services. This includes information that you provide
          directly and data that is collected automatically.
        </Typography>

        <Box component="ul" sx={{ paddingLeft: 2 }}>
          <Typography variant="body2">
            <strong>a. Personal Information You Provide:</strong>
          </Typography>
          <Box component="ul" sx={{ paddingLeft: 4 }}>
            <Typography component="li" variant="body2">
              <strong>Contact Information:</strong> Name, email address, phone
              number, mailing address.
            </Typography>
            <Typography component="li" variant="body2">
              <strong>Educational Information:</strong> Academic records, test
              scores, course preferences, etc.
            </Typography>
            <Typography component="li" variant="body2">
              <strong>Payment Information:</strong> Billing address and payment
              details for tuition fees or other services.
            </Typography>
            <Typography component="li" variant="body2">
              <strong>Enrollment Information:</strong> Details related to your
              admission or enrollment, including documents you submit (e.g.,
              identification, certificates).
            </Typography>
          </Box>
        </Box>

        <Box component="ul" sx={{ paddingLeft: 2, paddingTop: 2 }}>
          <Typography variant="body2">
            <strong>b. Automatic Data Collection:</strong>
          </Typography>
          <Box component="ul" sx={{ paddingLeft: 4 }}>
            <Typography component="li" variant="body2">
              <strong>Website Usage Data:</strong> Information about your
              interaction with our website, such as your IP address, browser
              type, pages viewed, and duration of visit.
            </Typography>
            <Typography component="li" variant="body2">
              <strong>Cookies and Tracking Technologies:</strong> We may use
              cookies, web beacons, and other tracking technologies to enhance
              your experience and gather insights about how visitors interact
              with our site.
            </Typography>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PrivacyPolicyModal;
