import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Paper, Typography, CircularProgress , Button } from "@mui/material";

const ProductDetail = () => {
  const { id } = useParams();
  const navi = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/products/${id}`)
      .then((response) => {
        if (response.data) {
          setProduct(response.data);
        } else {
          setError("Product not found.");
        }
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching product details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <CircularProgress sx={{ display: "block", margin: "auto" }} />;
  if (error) return <Typography color="error" sx={{ textAlign: "center" }}>{error}</Typography>;

  return (
    <Paper 
      sx={{ 
        padding: "20px", 
        width: "fit-content", 
        margin: "auto", 
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }} 
      elevation={6}
    >
      <Typography variant="h4">{product?.name || "No Name"}</Typography>
      {product?.img ? (
        <img 
          src={product.img} 
          alt={product.name} 
          style={{ width: "25%", borderRadius: "10px", marginTop: "10px" }} 
        />
      ) : (
        <Typography variant="body2" color="gray">No Image Available</Typography>
      )}
      <Typography variant="h3" sx={{ marginTop: "10px" }}>
        {product?.description || "No Description Available"}
      </Typography>
      <Typography variant="h6" sx={{ marginTop: "10px" }}>
        Price: Rs.{product?.price || "Not Available"}
      </Typography>

      <Button variant="outlined" sx={{marginTop:'15px'}} onClick={()=>navi("/products")}>Back To Store</Button>
    </Paper>
  );
};

export default ProductDetail;
