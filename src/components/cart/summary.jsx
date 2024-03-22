import { Wallet } from "lucide-react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

import useCart from "../../hooks/use-cart";
import Currency from "../ui/currency";

function Summary() {
  const [searchParams] = useSearchParams();

  const productItems = useCart((state) => state.productItems);
  const offerItems = useCart((state) => state.offerItems);
  const removeAll = useCart((state) => state.removeAll);

  useEffect(() => {
    let paymentCompleted = false;

    if (searchParams.get("success") && !paymentCompleted) {
      toast.success("Payment completed.");
      removeAll();
      paymentCompleted = true; // Set paymentCompleted flag to true
    }

    if (searchParams?.get("canceled")) {
      toast.error("Something went wrong.");
    }
  }, [searchParams, removeAll]);

  const totalPriceFromProducts = productItems.reduce((total, item) => {
    return (
      total +
      Number(
        item.price.find((price) => price.size === item.selectedSize)?.pr *
          item.quantity || item.price[0].pr * item.quantity
      )
    );
  }, 0);

  const totalPriceFromOffers = offerItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const totalPrice = totalPriceFromProducts + totalPriceFromOffers;

  const onCheckout = async () => {
    const stripe = await loadStripe(
      "pk_test_51Os1xgGMUahkuOEpq1ocLcu40WY2mupSx3J4msiQNacUhfYlRPnYwotSt5DHTOMgzxVtQ92isEzIKYFINxdLQ65n000rfabEZC"
    );

    const body = {
      products: productItems,
      offers: offerItems,
      price: totalPrice,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch("http://localhost:8000/api/v1/checkout", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  return (
    <div className="mt-5 rounded-xl bg-black/90 px-4 py-4 text-white w-full self-center border-y border-opacity-50 border-y-[#d4662297] shadow-sm shadow-[#d4662290]">
      <h2 className="mb-1 text-2xl font-medium">Order Summary</h2>
      {/* Products Summary */}
      {productItems?.map((item) => (
        <div
          key={`${item.id}-${item.selectedSize}-${item.selectedDough}`}
          className="flex items-center gap-1 mb-1">
          <p className="p-1 font-bold tracking-widest">{item.title}</p>
          <p className="p-1 text-sm rounded-full bg-orange-800/90">
            {item.selectedSize}
          </p>
          {item.selectedDough && (
            <p className="p-1 text-sm rounded-full bg-orange-800/70">
              {item.selectedDough}
            </p>
          )}
          <p className="p-1 text-sm rounded-full bg-white/10">
            x{item.quantity}
          </p>
        </div>
      ))}

      {/* Offers Summary */}
      {offerItems?.map((item) => (
        <div key={item._id} className="flex items-center gap-1 mb-1">
          <p className="p-1 font-bold tracking-widest">{item.name}</p>
          <p className="p-1 text-sm rounded-full bg-white/10">
            x{item.quantity}
          </p>
        </div>
      ))}

      {/* Order Total */}
      <div className="mt-3 space-y-4">
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="text-base font-medium">Order Total</div>
          <Currency value={totalPrice} />
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        disabled={productItems.length === 0}
        className="flex items-center justify-center w-full gap-2 p-3 mt-6 font-semibold text-white transition duration-500 rounded-full bg-neutral-500 hover:bg-green-600 disabled:cursor-not-allowed group">
        <p className="tracking-wider uppercase transition group-hover:-translate-x-3">
          Checkout
        </p>
        <Wallet size={20} className="transition group-hover:translate-x-3" />
      </button>
    </div>
  );
}

export default Summary;
