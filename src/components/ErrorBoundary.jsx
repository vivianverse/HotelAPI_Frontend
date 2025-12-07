import React from "react";
import { Box, Typography, Button } from "@mui/material";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            textAlign: "center",
            background: "linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)",
          }}
        >
          <Typography variant="h4" color="error" gutterBottom>
            Oops! Something went wrong 😢
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Please try reloading the page or contact support if the problem persists.
          </Typography>
          <Button variant="contained" color="error" onClick={this.handleReload}>
            Reload Page
          </Button>

          {process.env.NODE_ENV === "development" && this.state.error && (
            <Typography
              variant="caption"
              sx={{
                mt: 4,
                background: "#fff",
                p: 2,
                borderRadius: 1,
                maxWidth: 500,
                whiteSpace: "pre-wrap",
              }}
            >
              {this.state.error.toString()}
            </Typography>
          )}
        </Box>
      );
    }

    return this.props.children;
  }
}
