import { Alert, Box } from "@mui/material";
import React from "react";
import invalidStyles from "./invalidPageStyles";

const InvalidPage = () => {
  return (
    <Box sx={invalidStyles.container}>
      <Alert variant="outlined" severity="error" sx={invalidStyles.alert}>
        404 | Page Not Found
      </Alert>
    </Box>
  );
};

export default InvalidPage;
