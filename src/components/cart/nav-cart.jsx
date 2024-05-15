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
    <Link
      to={"/cart"}
      className="flex items-center ml-auto text-white gap-x-3 group">
      <p className="hidden font-serif text-base font-semibold tracking-wide transition sm:flex group-hover:text-orange-300 group-hover:translate-x-3 text-nowrap">
        Go to your cart &gt;
      </p>
      <div className="flex items-center p-[5px] font-semibold transition bg-black border-transparent rounded-full md:p-2 group-hover:opacity-75">
        <ShoppingCart size={18} className="group-hover:text-orange-300" />
        <span className="text-sm font-medium md:ml-2 xs:ml-1 group-hover:text-orange-300">
          {cart.productItems?.length + cart.offerItems?.length}
        </span>
      </div>
    </Link>
  );
};

export default NavCart;
