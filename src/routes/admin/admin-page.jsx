import { Link, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { RedirectToSignIn, useAuth, UserButton } from "@clerk/clerk-react";
import logo from "../../assets/logo.png";

const AdminPage = () => {
  const { pathname } = useLocation();

  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded || !isSignedIn) {
    return RedirectToSignIn();
  }

  return (
    <div className="flex flex-row h-screen w-screen overflow-hidden">
      <div className="flex flex-col flex-1">
        <header className=" flex mx-auto w-full h-16 items-center justify-center p-4 backdrop-filter backdrop-blur-md bg-opacity-95 border-b border-b-orange-700">
          <Link to="/">
            <img src={logo} className="w-16 h-auto mr-8" />
          </Link>
          <ul className="flex gap-8 font-semibold">
            <Link
              to="/admin"
              className={`${
                pathname === "/admin"
                  ? "h-full bg-red-800 bg-opacity-70 px-2 py-1 border border-red-900 font-bold rounded-2xl text-white"
                  : "font-bold hover:bg-red-800 bg-slate-100 bg-opacity-70 px-2 py-1 rounded-2xl transition hover:text-white text-neutral-600"
              }`}>
              Categories
            </Link>
            <Link
              to="/admin/subcategories"
              className={`${
                pathname === "/admin/subcategories"
                  ? "h-full bg-red-800 bg-opacity-70 px-2 py-1 border border-red-900 font-bold rounded-2xl text-white"
                  : "font-bold hover:bg-red-800 bg-slate-100 bg-opacity-70 px-2 py-1 rounded-2xl transition hover:text-white text-neutral-600"
              }`}>
              SubCategories
            </Link>
          </ul>
          <div className="ml-auto">
            <UserButton />
          </div>
        </header>
        <Outlet />
      </div>
    </div>
  );
};
export default AdminPage;
