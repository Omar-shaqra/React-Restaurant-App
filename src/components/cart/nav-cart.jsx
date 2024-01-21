import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

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
    <div className="ml-auto flex items-center gap-x-4">
      <Link
        to={"/cart"}
        className="flex rounded-full bg-neutral-700 border-transparent p-2 
    text-white font-semibold hover:opacity-75 transition">
        <ShoppingCart size={18} />
        <span className="ml-2 text-sm font-medium  text-white">
          {cart.items?.length}
        </span>
      </Link>
    </div>
  );
};

export default NavCart;
