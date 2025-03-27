import React, { useState } from "react";
import { Grid, Paper, Typography, Box, Button, Alert, Snackbar, CardMedia } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { removeProduct } from "../store/cartSlice";
import productListStyles from "../productList/productListStyles";

const CartList = () => {
  const cartProducts = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleRemove = (id) => {
    dispatch(removeProduct(id));
    setSnackbarMessage("Item removed from cart");
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <Alert variant="outlined" severity="info" sx={{mt:25 , mr:20 ,ml:20}}>
        No Products In Cart
      </Alert>
    );
  }

  return (
    <>
        <Typography sx={productListStyles.cartItems}>Total items in the cart - {cartProducts.length}</Typography>
      <Grid container spacing={3} sx={productListStyles.container}>
        {cartProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Paper elevation={3} sx={productListStyles.paper}>
              <CardMedia component="img" height="194" image={product.img} alt={product.name}/>
              <Typography variant="h6">{product.name}</Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                sx={productListStyles.description}
              >
                {product.description.length > 50
                  ? `${product.description.substring(0, 50)}...`
                  : product.description}
              </Typography>
              <Typography variant="h6" color="primary">
                Rs.{product.price}
              </Typography>
              <Box sx={productListStyles.btndiv}>
                <Button color="error" onClick={() => handleRemove(product.id)}>
                  Remove
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </>
  );
};

export default CartList;
