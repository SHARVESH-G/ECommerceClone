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

const pages = ["Products", "Add Products", "Cart", "Profile", "SignUp"];

function Navbar({ darkMode, setDarkMode }) {
  const cartItems = useSelector((state) => state.cart);
  const cartCount = cartItems.length;
  const navigate = useNavigate();

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
            <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
              {darkMode ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
