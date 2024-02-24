import { useEffect, useState } from "react";

import empty_cart from "../assets/empty_cart.png";
import CartItem from "../components/cart/cart-item";
import Summary from "../components/cart/summary";
import useCart from "../hooks/use-cart";

function CartPage() {
  const cart = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="container w-full px-4 pt-10 mx-auto text-white flex flex-col gap-5">
      <h1 className="flex flex-col mb-2 self-center font-semibold text-3xl bg-white/30 p-2 tracking-widest w-fit rounded-2xl">
        Shopping Cart
      </h1>
      <div className="flex flex-col justify-center items-center px-4">
        {cart.items.length === 0 && (
          <div className="h-screen flex flex-col items-center">
            <img
              src={empty_cart}
              className="w-80 mt-8 rounded-full bg-white/10 p-4"
              alt=""
            />
          </div>
        )}
        <ul className="flex flex-col justify-center  items-center gap-2 w-full self-center">
          {cart.items.map((item) => (
            <CartItem key={item.id} data={item} />
          ))}
        </ul>
        {cart.items.length > 0 && <Summary />}
      </div>
    </div>
  );
}

export default CartPage;
