import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserRoundPlus } from "lucide-react";
import { UserButton, useUser, SignedIn } from "@clerk/clerk-react";

import NavCart from "./cart/nav-cart";
import logo from "../assets/logo.png";

function Navbar() {
  const [isMounted, setIsMounted] = useState(false);
  const { isSignedIn } = useUser();

  useEffect(() => {
    setIsMounted(true);
  }, [isSignedIn]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="border-b border-b-orange-400 mx-auto w-full shadow-orange-200 backdrop-filter backdrop-blur-md bg-opacity-95">
      <div className="container flex h-16 items-center justify-between px-4 ml-6">
        <Link to="/">
          <img src={logo} className="w-16 h-auto mr-8" />
        </Link>
        <div className="flex items-center space-x-10 text-lg font-semibold font-serif text-white">
          <a
            href="#deals"
            className="hover:scale-105 hover:text-red-200 transition">
            Deals
          </a>
          <p className="hover:scale-105 hover:text-red-200 transition">Item</p>
          <p>Item</p>
          <a
            href="#footer"
            className="hover:scale-105 hover:text-red-200 transition">
            Contact
          </a>
        </div>
        <div className="ml- flex items-center justify-end space-x-4">
          <NavCart />
          {isSignedIn ? (
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          ) : (
            <Link to={"/admin"}>
              <UserRoundPlus size={20} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
