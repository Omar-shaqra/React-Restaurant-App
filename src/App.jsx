import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./components/ui/layout";
import Home from "./routes/home";
import Cart from "./routes/cart";
import Admin from "./routes/admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
