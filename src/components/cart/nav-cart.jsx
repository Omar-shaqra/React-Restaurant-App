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
    <div className="container ml-auto flex items-center gap-x-4">
      <Link
        to={"/cart"}
        className="flex items-center rounded-full bg-black border-transparent md:p-2 xs:p-1
    text-white font-semibold hover:opacity-75 transition">
        <ShoppingCart size={18} />
        <span className="md:ml-2 xs:ml-1 text-sm font-medium text-white">
          {cart.items?.length}
        </span>
      </Link>
    </div>
  );
};

export default NavCart;
