const productListStyles = {
  container: {
    padding: 2,
  },
  paper: {
    padding: 2,
    textAlign: "center",
    border:'2px solid grey',
    backgroundColor:'white',
  },
  inStock: {
    color: "green",
  },
  outOfStock: {
    color: "red",
  },
  strike:{
    fontSize:"15px",
    color:'grey',
  },
  description: {
    fontSize: "10px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsie",
  },
  cartItems:{
    textAlign:'center',
    margin:'20px',
    fontSize:'20px',
  },
  id:{
    fontSize:'8px',
    color:'grey',
    textAlign:'end',
  }
};

export default productListStyles;
