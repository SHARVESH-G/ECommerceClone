import { Alert, Box  ,Button,Typography} from "@mui/material";
import React from "react";
import invalidStyles from "./invalidPageStyles";
import { useNavigate } from "react-router-dom";

const InvalidPage = () => {
  let navi = useNavigate()

  function move(){
    navi("/signup")
  }
  return (
    <Box sx={invalidStyles.container}>
      <Alert variant="outlined" severity="error" sx={invalidStyles.alert}>
        404 | Page Not Found
      </Alert>
      <Button onClick={move}>
        <Typography>Login / Register here</Typography>
      </Button>
    </Box>
  );
};

export default InvalidPage;
