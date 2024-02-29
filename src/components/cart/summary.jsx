import { Wallet } from "lucide-react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

import useCart from "../../hooks/use-cart";
import Currency from "../ui/currency";

function Summary() {
  const [searchParams] = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed.");
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    return (
      total +
      Number(
        item.price.find((price) => price.size === item.selectedSize)?.pr *
          item.quantity || item.price[0].pr * item.quantity
      )
    );
  }, 0);

  return (
    <div className="mt-5 rounded-xl bg-black/90 px-4 py-4 text-white w-full self-center border-y border-opacity-50 border-y-[#d4662297] shadow-sm shadow-[#d4662290]">
      <h2 className="text-2xl font-medium mb-1">Order Summary</h2>
      {items.map((item) => (
        <div
          key={`${item.id}-${item.selectedSize}-${item.selectedDough}`}
          className="flex gap-1 mb-1 items-center">
          <p className="font-bold tracking-widest p-1">{item.title}</p>
          <p className="bg-orange-800/90 rounded-full p-1 text-sm">
            {item.selectedSize}
          </p>
          {item.selectedDough && (
            <p className="bg-orange-800/70 rounded-full p-1 text-sm">
              {item.selectedDough}
            </p>
          )}
          <p className="bg-white/10 rounded-full p-1 text-sm">
            x{item.quantity}
          </p>
        </div>
      ))}
      <div className="mt-3 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium">Order Total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <button
        onClick={() => {
          toast.error("Not Working yet");
        }}
        disabled={items.length === 0}
        className="w-full flex justify-center items-center gap-2 rounded-full p-3 text-white font-semibold mt-6 bg-neutral-500 hover:bg-green-600 transition duration-500 disabled:cursor-not-allowed group">
        <p className="group-hover:-translate-x-3 transition tracking-wider uppercase">
          Checkout
        </p>
        <Wallet size={20} className="group-hover:translate-x-3 transition" />
      </button>
    </div>
  );
}

export default Summary;
