import { Link } from "react-router-dom";
import { UserRoundPlus } from "lucide-react";
import { UserButton, useUser, SignedIn } from "@clerk/clerk-react";

import NavCart from "./cart/nav-cart";
import { useEffect, useState } from "react";
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
    <div className="border-b bg-[#ffe3a6] border-b-orange-700 z-10 mx-auto w-full ">
      <div className="flex h-16 items-center px-4 ml-6 container">
        <a href="/">
          <img src="/assets/logo.png" className="w-16 h-auto mr-8" />
        </a>
        <div className="flex items-center space-x-4 text-lg font-semibold text-orange-900">
          <a href={"#deals"} className="hover:scale-105 transition">
            Deals
          </a>
          <p>Item</p>
          <p>Item</p>
          <p>Item</p>
        </div>
        <div className="ml-auto flex items-center space-x-4">
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
