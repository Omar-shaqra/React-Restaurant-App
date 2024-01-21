import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Container from "../components/ui/Container";
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
    <Container>
      <div className="px-4 py-16 sm:px-4 md:px-6 lg:px-8">
        <h1 className="text-3xl font-bold ">Shopping Cart</h1>
        <div className="lg:col-span-7">
          {cart.items.length === 0 && <p>No items added to cart</p>}
          <ul>
            {cart.items.map((item) => (
              <CartItem key={item.id} data={item} />
            ))}
          </ul>
        </div>
        <Summary />
        <Link to={"/"}>
          <button
            onClick={() => {}}
            className="flex justify-center w-28 gap-2 p-3 mt-20 rounded-full translate-x-0
            text-white font-semibold bg-neutral-400 hover:bg-red-600 transition duration-500 group">
            Back
            <ArrowRight className="group-hover:translate-x-2 transition-all" />
          </button>
        </Link>
      </div>
    </Container>
  );
}

export default CartPage;
