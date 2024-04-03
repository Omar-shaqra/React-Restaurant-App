import "./App.css";

// import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { useAuth } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";

import Layout from "./components/ui/layout";
import AddCategory from "./routes/admin/add-category";
import AddOffer from "./routes/admin/add-offer";
import AddProduct from "./routes/admin/add-product";
import AddSubcategory from "./routes/admin/add-subcategory";
import AdminLayout from "./routes/admin/admin-layout";
import Orders from "./routes/admin/orders";
import Cart from "./routes/cart";
import Home from "./routes/home";
import NotFound from "./routes/not-found";
import OurNew from "./routes/ourNew";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`*`} element={<NotFound />} />
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path={`/cart`} element={<Cart />} />
          <Route path={`/our-new`} element={<OurNew />} />
        </Route>
        <Route path={`/admin`} element={<AdminLayout />}>
          <Route path={`/admin`} element={<Orders />} />
          <Route path={`/admin/products`} element={<AddProduct />} />
          <Route path={`/admin/categories`} element={<AddCategory />} />
          <Route path={`/admin/subcategories`} element={<AddSubcategory />} />
          <Route path={`/admin/offers`} element={<AddOffer />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
