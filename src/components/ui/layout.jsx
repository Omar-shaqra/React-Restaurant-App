import { Outlet } from "react-router-dom";

import Navbar from "../navbar";
function Layout() {
  return (
    <div className="flex flex-col flex-1">
      <Navbar />
      <div className="flex-1 p-4 min-h-0 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
