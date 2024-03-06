import { RedirectToSignIn, useAuth } from "@clerk/clerk-react";
import { Link, Outlet, useLocation } from "react-router-dom";

import logo from "../../assets/logo.png";

const AdminPage = () => {
  const { pathname } = useLocation();

  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded || !isSignedIn) {
    return RedirectToSignIn();
  }

  return (
    <div className="flex flex-row w-screen h-screen overflow-hidden bg-neutral-950/80">
      <div className="flex flex-col flex-1 p-0 m-0">
        <header className="flex mx-auto w-full h-16 items-center justify-center p-4 backdrop-filter backdrop-blur-md bg-opacity-95 border-b border-b-[#d46622]">
          <Link to="/admin" className="mr-auto">
            <img src={logo} className="w-16 h-auto" />
          </Link>
          <ul className="flex gap-8 mr-auto font-semibold">
            <Link
              to="/admin"
              className={`${
                pathname === "/admin"
                  ? "h-full bg-red-800 bg-opacity-70 px-2 py-1 border border-red-900 font-bold rounded-2xl text-white"
                  : "font-bold hover:bg-red-900 bg-slate-100 bg-opacity-70 px-2 py-1 rounded-2xl transition hover:text-white text-neutral-600"
              }`}>
              Products
            </Link>
            <Link
              to="/admin/categories"
              className={`${
                pathname === "/admin/categories"
                  ? "h-full bg-red-800 bg-opacity-70 px-2 py-1 border border-red-900 font-bold rounded-2xl text-white"
                  : "font-bold hover:bg-red-900 bg-slate-100 bg-opacity-70 px-2 py-1 rounded-2xl transition hover:text-white text-neutral-600"
              }`}>
              Categories
            </Link>
            <Link
              to="/admin/subcategories"
              className={`${
                pathname === "/admin/subcategories"
                  ? "h-full bg-red-800 bg-opacity-70 px-2 py-1 border border-red-900 font-bold rounded-2xl text-white"
                  : "font-bold hover:bg-red-900 bg-slate-100 bg-opacity-70 px-2 py-1 rounded-2xl transition hover:text-white text-neutral-600"
              }`}>
              SubCategories
            </Link>
            <Link
              to="/admin/offers"
              className={`${
                pathname === "/admin/offers"
                  ? "h-full bg-red-800 bg-opacity-70 px-2 py-1 border border-red-900 font-bold rounded-2xl text-white"
                  : "font-bold hover:bg-red-900 bg-slate-100 bg-opacity-70 px-2 py-1 rounded-2xl transition hover:text-white text-neutral-600"
              }`}>
              Offers
            </Link>
          </ul>
          {/* <div className="ml-auto"> */}
          {/* <UserButton /> */}
          {/* </div> */}
        </header>
        <div className="overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default AdminPage;
