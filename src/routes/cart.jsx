import { useEffect, useState } from "react";

import ProductCartItem from "../components/cart/product-cart-item";
import Summary from "../components/cart/summary";
import useCart from "../hooks/use-cart";
import OfferCartItem from "../components/cart/offer-cart-item";

function CartPage() {
  const { productItems, offerItems } = useCart();
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
        {/* Empty Cart */}
        {productItems.length + offerItems.length === 0 && (
          <div className="flex flex-col items-center h-screen">
            <img
              src={"/empty_cart.png"}
              className="p-4 mt-8 rounded-full w-80 bg-white/10"
              alt=""
            />
          </div>
        )}

        <ul className="flex flex-col items-center self-center justify-center w-full gap-2">
          {productItems?.map((item) => (
            <ProductCartItem
              key={`${item.id}-${item.selectedSize}-${item.selectedDough}`}
              data={item}
            />
          ))}
          {offerItems?.map((item) => (
            <OfferCartItem key={item._id} data={item} />
          ))}
        </ul>
        {(productItems.length > 0 || offerItems.length > 0) && <Summary />}
      </div>
    </div>
  );
}

export default CartPage;
