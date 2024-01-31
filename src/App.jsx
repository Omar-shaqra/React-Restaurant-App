import "./App.css";

// import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { useAuth } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";

import Layout from "./components/ui/layout";
import Home from "./routes/home";
import Cart from "./routes/cart";
// import Subcategory from "./routes/subcategory";
import Admin from "./routes/admin/admin-page";
import NotFound from "./components/ui/not-found";
import AddCategory from "./routes/admin/add-category";
import AddSubcategory from "./routes/admin/add-subcategory";
// import Subcategory from "./routes/subcategory";
import AddProduct from "./routes/admin/add-product";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`*`} element={<NotFound />} />
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path={`/cart`} element={<Cart />} />
          {/* <Route path={`/subcategory/:id`} element={<Subcategory />} /> */}
        </Route>
        <Route path={`/admin`} element={<Admin />}>
          <Route path={`/admin`} element={<AddProduct />} />
          <Route path={`/admin/categories`} element={<AddCategory />} />
          <Route path={`/admin/subcategories`} element={<AddSubcategory />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
