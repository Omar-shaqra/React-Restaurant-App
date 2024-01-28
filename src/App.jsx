import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

import Layout from "./components/ui/layout";
import Home from "./routes/home";
import Cart from "./routes/cart";
import Admin from "./routes/admin/admin";
import Subcategory from "./routes/subcategory";
import NotFound from "./components/ui/not-found";
import AddCategory from "./routes/admin/add-category";
import AddSubcategory from "./routes/admin/add-category";
import { useEffect, useState } from "react";

function App() {
  const [isMounted, setIsMounted] = useState(false);
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    setIsMounted(true);
  }, [isSignedIn, isMounted, isSignedIn]);

  if (!isMounted) {
    return null;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/subcategories" element={<Subcategory />} />
        </Route>
        <Route path={`*`} element={<NotFound />} />
        <Route path="/admin" element={<Admin />} />
        {isSignedIn && isLoaded && (
          <>
            <Route path="/admin/categories" element={<AddCategory />} />
            <Route path="/admin/subcategories" element={<AddSubcategory />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
