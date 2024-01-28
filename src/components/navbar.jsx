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
    <div className="border-b bg-[#ffe3a6] border-b-orange-700 mx-auto w-full shadow-md shadow-orange-200 backdrop-filter backdrop-blur-lg bg-opacity-95">
      <div className="container flex h-16 items-center justify-between px-4 ml-6">
        <a href="/">
          <img src={logo} className="w-16 h-auto mr-8" />
        </a>
        <div className="flex items-center space-x-10 text-lg font-semibold font-serif text-orange-900">
          <a href="#deals" className="hover:scale-105">
            Deals
          </a>
          <p>Item</p>
          <p>Item</p>
          <a href="#footer" className="hover:scale-105">
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
