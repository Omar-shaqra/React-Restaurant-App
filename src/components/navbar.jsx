import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";
import { UserRoundPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/logo.png";
import NavCart from "./cart/nav-cart";

function Navbar() {
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const { isSignedIn } = useUser();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [isSignedIn]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="border-b px-2 border-b-[#d46622] mx-auto w-full shadow-orange-200 backdrop-filter backdrop-blur-md bg-opacity-95">
      <div className="flex h-16 items-center justify-between">
        <Link to="/">
          <img src={logo} className="w-16 h-auto mr-auto" />
        </Link>
        <div className="flex items-center md:space-x-10 xs:space-x-2 xl:text-xl md:text-xl sm:text-sm xs:text-sm font-semibold font-serif text-[#fdf8ef]">
          <a
            href={`${origin}/#deals`}
            className="hover:scale-110 hover:text-red-300 transition">
            Deals
          </a>
          <a
            href="/#offers"
            className="hover:scale-110 hover:text-red-300 transition">
            Offers
          </a>
          <a
            href="#footer"
            className="hover:scale-110 hover:text-red-300 transition">
            Contact
          </a>
          <Link
            to={"/our-new"}
            className="hover:scale-110 hover:text-red-300 transition p-1">
            Our New
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <NavCart />
          {isSignedIn ? (
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          ) : (
            <Link to={"/admin"}>
              <UserRoundPlus className="size-auto" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
