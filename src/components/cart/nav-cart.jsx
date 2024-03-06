import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useCart from "../../hooks/use-cart";

const NavCart = () => {
  const cart = useCart();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="container flex items-center ml-auto gap-x-4">
      <Link
        to={"/cart"}
        className="flex items-center font-semibold text-white transition bg-black border-transparent rounded-full md:p-2 xs:p-1 hover:opacity-75">
        <ShoppingCart size={18} />
        <span className="text-sm font-medium text-white md:ml-2 xs:ml-1">
          {cart.items?.length}
        </span>
      </Link>
    </div>
  );
};

export default NavCart;
