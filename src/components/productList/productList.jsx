import React, { useState, useEffect } from "react";
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
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel
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
  const [searchQuery, setSearchQuery] = useState(""); 
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [sortOption, setSortOption] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialProducts) {
      setProducts(initialProducts);
    }
  }, [initialProducts]);

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "a-z") return a.name.localeCompare(b.name);
      if (sortOption === "z-a") return b.name.localeCompare(a.name);
      if (sortOption === "price-high") return b.price - a.price;
      if (sortOption === "price-low") return a.price - b.price;
      if (sortOption === "stock-low") return a.stock - b.stock;
      if (sortOption === "stock-high") return b.stock - a.stock;
      return 0;
    });

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

  let cartContain = useSelector((state) => state.cart);

  const addProtoCart = (product) => {
    let checkProduct = cartContain.some(cartIts => cartIts.id === product.id);
    if (!checkProduct) {
      dispatch(addProduct(product));
      Swal.fire({
        title: "Success",
        text: "Product Added To Cart!",
        icon: "success",
      });
    } else {
      Swal.fire("Product Already In Cart");
    }
    setOpenSnackbar(true);
  };

  const viewProduct = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (isload) return <CircularProgress sx={{ display: "block", margin: "auto" }} />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  if (!products || products.length === 0) {
    return <Alert variant="outlined" severity="info">No Products To List</Alert>;
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3, mt: 5, gap: 2 }}>
        <TextField
          label="Search Products"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: "50%" }}
        />
        <FormControl sx={{ width: "230px" }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            label="Sort By"
          >
            <MenuItem value="a-z">Name : A-Z</MenuItem>
            <MenuItem value="z-a">Name : Z-A</MenuItem>
            <MenuItem value="price-high">Price: High to Low</MenuItem>
            <MenuItem value="price-low">Price: Low to High</MenuItem>
            <MenuItem value="stock-low">Stock: Low to High</MenuItem>
            <MenuItem value="stock-high">Stock: High to Low</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3} sx={productListStyles.container}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Paper elevation={3} sx={productListStyles.paper}>
                <Typography variant="body1" sx={productListStyles.id}>#{product.id}</Typography>
                <CardMedia component="img" height="194" image={product.img} alt={product.name} sx={productListStyles.img} />
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
                  <Button variant="outlined" color="primary" onClick={() => navigate(`/editproducts/${product.id}`)}>Edit</Button>
                  <Button variant="outlined" color="error" onClick={() => handleDelete(product.id)}>Delete</Button>
                  <Button variant="outlined" color="secondary" onClick={() => addProtoCart(product)}>Add To Cart</Button>
                  <Button variant="text" sx={{ border: 'black 0.8px solid', color: 'black' , height:'36px' }} onClick={() => viewProduct(product)}>View</Button>
                </Box>
              </Paper>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" sx={{ textAlign: "center", width: "100%" }}>No Products Found</Typography>
        )}
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
