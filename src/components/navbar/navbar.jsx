import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container,
  Badge,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { DarkMode, LightMode } from "@mui/icons-material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import navbarStyles from "./navbarStyles";
import Swal from "sweetalert2";

const pages = ["Products", "Add Products", "Cart", "Profile"];

function Navbar({ darkMode, setDarkMode }) {
  const cartItems = useSelector((state) => state.cart);
  const cartCount = cartItems.length;
  const navigate = useNavigate();

  function logoutUser(){
    Swal.fire({
      title:"Are you Sure?",
      text:"Do you want to logout?",
      showCancelButton:true,
      cancelButtonText:"cancel",
      confirmButtonText:"Confirm",
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d55',
    })
    .then((result)=>{
      if(result.isConfirmed){
        localStorage.setItem("login" , JSON.stringify(false));
        window.location.reload()
      }
    })
  }


  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 700, fontSize: "24px" }}
          >
            RVD Store
          </Typography>

          <Box sx={{ display: "flex" }}>
            {pages.map((page) => {
              const routePath = page.toLowerCase().replace(/\s+/g, "");
              return (
                <Button
                  key={page}
                  onClick={() => navigate(`/${routePath}`)}
                  sx={{ color: "white", mx: 2 }}
                >
                  {page === "Cart" ? (
                    <Badge badgeContent={cartCount} color="secondary">
                      {page}
                    </Badge>
                  ) : (
                    page
                  )}
                </Button>
              );
            })}
            <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit" sx={navbarStyles.btns}>
              {darkMode ? <LightMode /> : <DarkMode />}
            </IconButton>
            <IconButton sx={navbarStyles.btns} color="inherit" onClick={logoutUser}>
              <ExitToAppIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
