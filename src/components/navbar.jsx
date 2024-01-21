import { UserButton } from "@clerk/clerk-react";
import Container from "./ui/Container";
import NavCart from "./cart/nav-cart";

function Navbar() {
  return (
    <div className="border-b mb-2 relative">
      <Container>
        <div className="flex h-16 items-center px-4">
          <a href="/">
            <img src="/public/logo.png" className="w-16 h-auto mr-8" />
          </a>
          <div className="flex items-center space-x-4">
            <p>Item</p>
            <p>Item</p>
            <p>Item</p>
            <p>Item</p>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <NavCart />
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Navbar;
