import { Outlet } from "react-router-dom";

import ProductModalProvider from "../../providers/product-modal-provider";
import OfferModalProvider from "../../providers/offer-modal-provider";
import Footer from "../footer";
import Navbar from "../navbar";
function Layout() {
  return (
    <div className="flex flex-row w-screen h-screen overflow-hidden">
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="flex-1 h-screen overflow-auto scroll-smooth bg-black/40">
          <OfferModalProvider />
          <ProductModalProvider />
          <Outlet />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Layout;
