import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";
import { UserRoundPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    <div className="w-full mx-auto border-b border-b-[#d46622] shadow-orange-200 backdrop-filter backdrop-blur-md bg-opacity-95">
      <div className="flex items-center justify-between h-16 ">
        <Link to="/">
          <img src={"/logo.png"} className="w-16 h-auto mr-auto" />
        </Link>
        <div className="flex gap-2 items-center md:space-x-10 xs:space-x-2 xl:text-xl md:text-xl sm:text-sm xs:text-sm font-semibold font-serif text-[#fdf8ef]">
          <a
            href={`${origin}/#deals`}
            className="transition hover:scale-110 hover:text-red-300">
            Deals
          </a>
          <a
            href="/#offers"
            className="transition hover:scale-110 hover:text-red-300">
            Offers
          </a>
          <a
            href="#footer"
            className="transition hover:scale-110 hover:text-red-300">
            Contact
          </a>
        </div>
        <div className="flex items-center px-1 space-x-4">
          <NavCart />
          {isSignedIn ? (
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          ) : (
            <Link to={"/login"}>
              <UserRoundPlus className="size-auto" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
