import { X, Minus, Plus } from "lucide-react";

import useCart from "../../hooks/use-cart";
import Currency from "../ui/currency";
import IconButton from "../ui/icon-button";
// import { useState } from "react";

function CartItem({ data }) {
  const cart = useCart();

  const onIncrease = () => {
    cart.increaseQuantity(data.id);
  };
  const onDecrease = () => {
    cart.decreaseQuantity(data.id);
  };
  const onRemove = () => {
    cart.removeItem(data.id);
  };

  const imgSrc =
    data && data.imageCover.replace("undefined", "http://localhost:8000");

  return (
    <li className="flex py-6 text-white bg-black/90 px-4 rounded-lg w-5/6 border-y border-y-[#d4662297] shadow-sm shadow-[#d4662290]">
      {/* Image */}
      <div className="h-48 w-64 overflow-hidden rounded-xl flex items-center justify-center">
        {imgSrc && (
          <img
            className="aspect-square object-contain object-center rounded-md"
            loading="lazy"
            src={imgSrc}
            alt="combos images"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col relative ml-4 justify-around sm:ml-6">
        <div className="relative ">
          <div className="flex justify-between items-center gap-2 mb-1">
            <div className="flex gap-2 items-center">
              <p className="text-3xl font-semibold">
                {data ? data.title : "product name"}
              </p>
              <p className="bg-orange-800 rounded p-1">{data.selectedSize}</p>
              <p className="bg-white/20 rounded p-1">x{data.quantity}</p>
            </div>
            <div>
              <IconButton
                className="hover:bg-red-600 text-white border-2 rounded-full"
                onClick={onRemove}
                icon={<X size={15} />}
              />
            </div>
          </div>
          <Currency
            value={
              data.price.find((price) => price.size === data.selectedSize)?.pr *
                data.quantity || data.price[0].pr * data.quantity
            }
          />
          <p className="mt-4 text-md text-justify text-neutral-400 font-semibold">
            {data ? data.description : "product name"}
          </p>
        </div>
        <div className="flex flex-row items-center gap-x-2">
          <IconButton
            className="hover:bg-green-600 text-white border-2 rounded-full"
            onClick={onIncrease}
            icon={<Plus size={15} />}
          />
          <p className="bg-white/20 p-2 rounded select-none">{data.quantity}</p>
          <IconButton
            className="hover:bg-red-600 text-white border-2 rounded-full"
            onClick={onDecrease}
            icon={<Minus size={15} />}
          />
        </div>
      </div>
    </li>
  );
}

export default CartItem;
