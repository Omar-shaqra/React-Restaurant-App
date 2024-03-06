import { useEffect, useState } from "react";

import empty_cart from "../assets/empty_cart.png";
import CartItem from "../components/cart/cart-item";
import Summary from "../components/cart/summary";
import useCart from "../hooks/use-cart";

function CartPage() {
  const { items } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="container flex flex-col w-full gap-5 px-4 pt-10 mx-auto text-white">
      <h1 className="flex flex-col self-center p-2 mb-2 text-3xl font-semibold tracking-widest bg-white/30 w-fit rounded-2xl">
        Shopping Cart
      </h1>
      <div className="flex flex-col items-center justify-center px-4">
        {items.length === 0 && (
          <div className="flex flex-col items-center h-screen">
            <img
              src={empty_cart}
              className="p-4 mt-8 rounded-full w-80 bg-white/10"
              alt=""
            />
          </div>
        )}
        <ul className="flex flex-col items-center self-center justify-center w-full gap-2">
          {items.map((item) => (
            <CartItem
              key={`${item.id}-${item.selectedSize}-${item.selectedDough}`}
              data={item}
            />
          ))}
        </ul>
        {items.length > 0 && <Summary />}
      </div>
    </div>
  );
}

export default CartPage;
