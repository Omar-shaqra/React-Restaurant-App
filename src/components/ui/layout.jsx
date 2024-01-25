import { Outlet } from "react-router-dom";

import Navbar from "../navbar";
import Footer from "../footer";
function Layout() {
  return (
    <div className="flex flex-row h-screen w-screen overflow-hidden">
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="flex-1 min-h-0 overflow-auto">
          <Outlet />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Layout;
