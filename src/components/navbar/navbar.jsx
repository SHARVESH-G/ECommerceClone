import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container,
  Badge,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const pages = ["Products", "Add Products", "Cart", "Profile" , "SignUp"];

function Navbar() {
  const cartProducts = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart);
  const cartCount = cartItems.length;

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
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
