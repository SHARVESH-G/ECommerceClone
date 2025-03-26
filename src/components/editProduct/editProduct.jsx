import React, { useState, useEffect } from "react";
import axios from "axios";
import { Paper, TextField, Grid, Typography, Button, Box } from "@mui/material";
import EditProductsStyles from "./editProductStyles";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

const EditProducts = () => {
  const Navi = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to fetch product details.",
          icon: "error",
        });
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:8080/products/${id}`, product, {
        headers: { "Content-Type": "application/json" },
      });
      Swal.fire({
        title: "Success!",
        text: "Product updated successfully!",
        icon: "success",
      });
      Navi("/products")
    } catch (error) {
      console.error("Error updating product:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update product.",
        icon: "error",
      });
    }
  };

  return (
    <Box sx={EditProductsStyles.container}>
      <Paper elevation={12} sx={EditProductsStyles.paper}>
        <Typography variant="h4" sx={EditProductsStyles.typotext}>
          Edit Product
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
          <Grid item xs={6}>
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
          <Grid item xs={6}>
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
              sx={EditProductsStyles.button}
              onClick={handleSubmit}
            >
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default EditProducts;
