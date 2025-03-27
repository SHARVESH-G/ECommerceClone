import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Paper, Typography, CircularProgress } from "@mui/material";

const ProductDetail = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching product details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Paper sx={{ padding: "20px" }}>
      <Typography variant="h4">{product.name}</Typography>
      <img src={product.img} alt={product.name} style={{ width: "100%" }} />
      <Typography variant="body1">{product.description}</Typography>
      <Typography variant="h6">Price: Rs.{product.price}</Typography>
    </Paper>
  );
};

export default ProductDetail;
