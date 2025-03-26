import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Box,
  Button,
  Alert,
  Snackbar,
  CardMedia,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useFetch from "../custom hooks/useFetch";
import productListStyles from "./productListStyles";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../store/cartSlice";

const ProductList = () => {
  const { datas: initialProducts, error, isload } = useFetch("http://localhost:8080/products");
  const [products, setProducts] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialProducts) {
      setProducts(initialProducts);
    }
  }, [initialProducts]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:8080/products/${id}`);
          setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
          Swal.fire("Deleted!", "Product has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting product:", error);
          Swal.fire("Error!", "Failed to delete product.", "error");
        }
      }
    });
  };

  let cartContain = useSelector( (state)=> { return state.cart } )

  let addProtoCart =(product) => {
    let checkProduct = cartContain.some(cartIts=> cartIts.id === product.id)
    if(!checkProduct){
      dispatch(addProduct(product));
      Swal.fire({
        title:"Success",
        text:"Product Added To Cart !",
        icon:"success",
      })
    }
    else{
      Swal.fire("Product Already In Cart");
    }
    setOpenSnackbar(true);
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (isload) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  if (!products || products.length === 0) {
    return (
      <Alert variant="outlined" severity="info">
        No Products To List
      </Alert>
    );
  }

  return (
    <>
      <Grid container spacing={3} sx={productListStyles.container}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Paper elevation={3} sx={productListStyles.paper}>
              <Typography variant="body1" sx={productListStyles.id}>#{product.id}</Typography>
              <CardMedia component="img" height="194" image={product.img} alt={product.name}/>
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="body1" color="textSecondary" sx={productListStyles.description}>
                {product.description?.length > 50
                  ? `${product.description.substring(0, 50)}...`
                  : product.description}
              </Typography>

              <Typography variant="h6" color="primary">
                {product.oldprice && parseInt(product.oldprice) > parseInt(product.price) ? (
                  <>
                    <strike style={productListStyles.strike}>Rs.{product.oldprice}</strike> Rs.{product.price}
                  </>
                ) : (
                  <>Rs.{product.price}</>
                )}
              </Typography>



              <Typography
                variant="body2"
                sx={product.stock && product.stock > 0 ? productListStyles.inStock : productListStyles.outOfStock}
              >
                {product.stock && product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
              </Typography>
              <Box sx={productListStyles.btndiv}>
                <Button color="primary" onClick={() => navigate(`/editproducts/${product.id}`)}>Edit</Button>
                <Button color="error" onClick={() => handleDelete(product.id)}>Delete</Button>
                <Button color="secondary" onClick={() => addProtoCart(product)}>Add To Cart</Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        message="Item Added To Cart"
        action={
          <Button color="secondary" size="small" onClick={() => navigate("/cart")}>
            View Cart
          </Button>
        }
        autoHideDuration={3000}
      />
    </>
  );
};

export default ProductList;