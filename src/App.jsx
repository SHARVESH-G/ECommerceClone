import React, { useState } from "react";
import MUINav from "./components/navbar/navbar";
import { BrowserRouter as AppRoute, Routes, Route } from "react-router-dom";
import AddProduct from "./components/addprod/addProducts";
import OTPage from "./components/invalid_page/invalidPage";
import Products from "./components/productList/productList";
import EditProduct from "./components/editProduct/editProduct";
import Cart from "./components/cartPage/cart";
import Profile from "./components/profile/profile";
import Signup from "./components/signup/signup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

if (!localStorage.getItem("cart")) {
  localStorage.setItem("cart", JSON.stringify([]));
}
if(localStorage.getItem("login") == null){
  localStorage.setItem("login" , JSON.stringify(false));
}


function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const NavBar = <MUINav darkMode={darkMode} setDarkMode={setDarkMode} />
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoute>
        { JSON.parse(localStorage.getItem("login")) ? NavBar : <Signup /> }
        <Routes>
          <Route path="addproducts" element={<AddProduct />} />
          <Route path="editproducts/:id" element={<EditProduct />} />
          <Route path="products" element={<Products />} />
          <Route path="cart" element={<Cart />} />
          <Route path="profile" element={<Profile />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<OTPage />} />
        </Routes>
      </AppRoute>
    </ThemeProvider>
  );
}

export default App;
