import "./App.css";

import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";

import Layout from "./components/ui/layout";
import Home from "./routes/home";
import Cart from "./routes/cart";
// import Subcategory from "./routes/subcategory";
import Admin from "./routes/admin/admin-page";
import NotFound from "./components/ui/not-found";
import AddCategory from "./routes/admin/add-category";
import AddSubcategory from "./routes/admin/add-subcategory";

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
        <Route path={`*`} element={<NotFound />} />
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          {/* <Route path={`*`} element={<NotFound />} /> */}
          {/* <Route path="/subcategories" element={<Subcategory />} /> */}
        </Route>
        <Route path="/admin" element={<Admin />}>
          {isMounted && isSignedIn && isLoaded && (
            <>
              {/* <Route path={`*`} element={<Admin />} /> */}
              <Route path="/admin/categories" element={<AddCategory />} />
              <Route path="/admin/subcategories" element={<AddSubcategory />} />
            </>
          )}
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
