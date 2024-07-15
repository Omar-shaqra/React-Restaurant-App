import {
  RedirectToSignIn,
  useAuth,
  UserButton,
  useSession,
} from "@clerk/clerk-react";
import { Link, Outlet, useLocation } from "react-router-dom";

import { checkUserRole } from "../../utils/constants";

const AdminLayout = () => {
  const { pathname } = useLocation();
  const { session } = useSession();
  const userRole = checkUserRole(session);

  const { isLoaded, isSignedIn } = useAuth();

  if (!isSignedIn) return RedirectToSignIn();

  if (!isLoaded) return <p>...Loading</p>;

  if (userRole != "org:admin")
    return (
      <div className="flex flex-col items-center w-full overflow-hidden">
        <p className="p-1 mt-20 font-bold tracking-widest text-white text-7xl bg-red-600/70">
          You Are Not Admin!
        </p>
        <Link
          className="p-4 mt-8 font-serif text-black transition rounded-full w-fit h-18 bg-amber-300 hover:bg-orange-400"
          to="/">
          Go back to Homepage
        </Link>
      </div>
    );

  return (
    <div className="flex flex-row w-screen h-screen overflow-hidden bg-neutral-950/80">
      <div className="flex flex-col flex-1 p-0 m-0">
        <header className="flex mx-auto w-full h-16 items-center justify-center p-4 backdrop-filter backdrop-blur-md bg-opacity-95 border-b border-b-[#d46622]">
          <Link to="/admin" className="mr-auto">
            <img src={"/logo.png"} className="w-16 h-auto" />
          </Link>
          <ul className="flex gap-8 mr-auto font-semibold">
            {/* Orders */}
            <Link
              to="/admin"
              className={`${
                pathname === "/admin"
                  ? "h-full bg-red-800 bg-opacity-70 px-2 py-1 border border-red-900 font-bold rounded-2xl text-white"
                  : "font-bold hover:bg-red-900 bg-slate-100 bg-opacity-70 px-2 py-1 rounded-2xl transition hover:text-white text-neutral-600"
              }`}>
              Orders
            </Link>
            {/* Products */}
            <Link
              to="/admin/products"
              className={`${
                pathname === "/admin/products"
                  ? "h-full bg-red-800 bg-opacity-70 px-2 py-1 border border-red-900 font-bold rounded-2xl text-white"
                  : "font-bold hover:bg-red-900 bg-slate-100 bg-opacity-70 px-2 py-1 rounded-2xl transition hover:text-white text-neutral-600"
              }`}>
              Products
            </Link>
            {/* Categories */}
            <Link
              to="/admin/categories"
              className={`${
                pathname === "/admin/categories"
                  ? "h-full bg-red-800 bg-opacity-70 px-2 py-1 border border-red-900 font-bold rounded-2xl text-white"
                  : "font-bold hover:bg-red-900 bg-slate-100 bg-opacity-70 px-2 py-1 rounded-2xl transition hover:text-white text-neutral-600"
              }`}>
              Categories
            </Link>
            {/* Subcategories */}
            <Link
              to="/admin/subcategories"
              className={`${
                pathname === "/admin/subcategories"
                  ? "h-full bg-red-800 bg-opacity-70 px-2 py-1 border border-red-900 font-bold rounded-2xl text-white"
                  : "font-bold hover:bg-red-900 bg-slate-100 bg-opacity-70 px-2 py-1 rounded-2xl transition hover:text-white text-neutral-600"
              }`}>
              SubCategories
            </Link>
            {/* Offers */}
            <Link
              to="/admin/offers"
              className={`${
                pathname === "/admin/offers"
                  ? "h-full bg-red-800 bg-opacity-70 px-2 py-1 border border-red-900 font-bold rounded-2xl text-white"
                  : "font-bold hover:bg-red-900 bg-slate-100 bg-opacity-70 px-2 py-1 rounded-2xl transition hover:text-white text-neutral-600"
              }`}>
              Offers
            </Link>

            {/* Reports */}
            <Link
              to="/admin/reports"
              className={`${
                pathname === "/admin/reports"
                  ? "h-full bg-red-800 bg-opacity-70 px-2 py-1 border border-red-900 font-bold rounded-2xl text-white"
                  : "font-bold hover:bg-red-900 bg-slate-100 bg-opacity-70 px-2 py-1 rounded-2xl transition hover:text-white text-neutral-600"
              }`}>
              Reports
            </Link>
          </ul>
          <div className="ml-auto">
            <UserButton />
          </div>
        </header>
        <div className="overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default AdminLayout;
