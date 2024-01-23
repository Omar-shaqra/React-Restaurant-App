import { Link } from "react-router-dom";
import { UserRoundPlus } from "lucide-react";
import { UserButton, useUser, SignedIn } from "@clerk/clerk-react";

import Container from "./ui/Container";
import NavCart from "./cart/nav-cart";
function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <div className="border-b bg-[#fce7bb] border-b-orange-700 relative z-10">
      <Container>
        <div className="flex h-16 items-center px-4">
          <a href="/">
            <img src="/src/assets/logo.png" className="w-16 h-auto mr-8" />
          </a>
          <div className="flex items-center space-x-4 text-lg font-semibold text-orange-900">
            <a href="#deals" className="hover:scale-105 transition">
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
      </Container>
    </div>
  );
}

export default Navbar;
