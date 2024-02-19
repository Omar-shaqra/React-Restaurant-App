import { Outlet } from "react-router-dom";

import ModalProvider from "../../providers/modal-provider";
import Footer from "../footer";
import Navbar from "../navbar";
function Layout() {
  return (
    <div className="flex flex-row h-screen w-screen overflow-hidden">
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="flex-1 h-screen overflow-auto scroll-smooth bg-black/40">
          <ModalProvider />
          <Outlet />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Layout;
