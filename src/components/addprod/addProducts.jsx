import React, { useState } from "react";
import axios from "axios";
import { Paper, TextField, Grid, Typography, Button, Box } from "@mui/material";
import addProductsStyles from "./addProductsStyles";
import Swal from "sweetalert2";

const AddProducts = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    oldprice:null,
    img:"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    price: "",
    stock: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8080/products", product, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Product Added:", response.data);
      Swal.fire({
        title: "Good job!",
        text: "Product added successfully!",
        icon: "success"
      });
      setProduct({ name: "", description: "", price: "", stock: "" });
    } catch (error) {
      console.error("Error adding product:", error);
      Swal.fire({
        title: "Good job!",
        text: "Failed to add product.",
        icon: "error"
      });
    }
  };

  return (
    <Box sx={addProductsStyles.container}>
      <Paper elevation={12} sx={addProductsStyles.paper}>
        <Typography variant="h4" sx={addProductsStyles.typotext}>
          Add Products
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Product Name"
              variant="outlined"
              fullWidth
              name="name"
              value={product.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              name="description"
              value={product.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Price"
              variant="outlined"
              type="number"
              fullWidth
              name="price"
              value={product.price}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="oldprice"
              variant="outlined"
              type="number"
              fullWidth
              name="oldprice"
              value={product.oldprice}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Stock"
              variant="outlined"
              type="number"
              fullWidth
              name="stock"
              value={product.stock}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={addProductsStyles.button}
              onClick={handleSubmit}
            >
              Add Product
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default AddProducts;
