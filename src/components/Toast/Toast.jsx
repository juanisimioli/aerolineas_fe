"use client";
import { Snackbar, Alert } from "@mui/material";
import { useToast } from "@/hooks/useToast";

const Toast = () => {
  const { open, variant, message, handleCloseToast } = useToast();

  const autoHideDuration = 10000;

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      autoHideDuration={autoHideDuration}
      data-testid="feedback-toast"
      onClose={handleCloseToast}
      open={open}
      style={{ height: "auto" }}
    >
      <Alert
        onClose={handleCloseToast}
        severity={
          ["success", "info", "warning", "error"].includes(variant)
            ? variant
            : "info"
        }
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
