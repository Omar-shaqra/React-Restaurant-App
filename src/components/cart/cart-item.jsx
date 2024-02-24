import { X, Minus, Plus } from "lucide-react";

import useCart from "../../hooks/use-cart";
import Currency from "../ui/currency";
import IconButton from "../ui/icon-button";

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
    <li className="flex sm:flex-row xs:flex-col w-full items-center p-3 text-white bg-black/90 rounded-lg border-y border-y-[#d4662297] shadow-sm shadow-[#d4662290]">
      {/* Image */}
      <div className="h-48 w-64 overflow-hidden rounded-xl flex items-center justify-center">
        {imgSrc && (
          <img
            className="aspect-square w-full object-contain object-center rounded-md"
            loading="lazy"
            src={imgSrc}
            alt="combos images"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 self-center space-y-2  relative sm:ml-6">
        {/* Title, Size, Quantity */}
        <div className="flex justify-between gap-2">
          <div className="flex gap-2 items-center">
            <p className="text-3xl font-semibold">
              {data ? data.title : "product name"}
            </p>
            <p className="bg-orange-800/90 rounded p-1">{data.selectedSize}</p>
            {data.selectedDough && (
              <p className="bg-orange-800/70 rounded p-1">
                {data.selectedDough}
              </p>
            )}
            <p className="bg-orange-800/50 rounded p-1">x{data.quantity}</p>
          </div>
          {/* X Button */}
          <IconButton
            className="hover:bg-red-600 text-white border-2 rounded-full"
            onClick={onRemove}
            icon={<X size={15} />}
          />
        </div>

        {/* Description */}
        <p className="text-md text-justify text-neutral-300 bg-white/40 p-1 w-fit rounded font-semibold">
          {data ? data.description : "product name"}
        </p>
        {/* Price & + & -  */}
        <div className="flex justify-between gap-2">
          <div className="flex flex-row items-center gap-x-2">
            <IconButton
              className="hover:bg-green-600 text-white border-2 rounded-full"
              onClick={onIncrease}
              icon={<Plus size={15} />}
            />
            <p className="bg-white/20 p-2 rounded select-none">
              {data.quantity}
            </p>
            <IconButton
              className="hover:bg-red-600 text-white border-2 rounded-full"
              onClick={onDecrease}
              icon={<Minus size={15} />}
            />
          </div>
          {/* Price */}
          <div className="flex border-2 border-orange-500 border-opacity-30 items-center p-1 w-fit bg-neutral-800 rounded">
            <Currency
              value={
                data.price.find((price) => price.size === data.selectedSize)
                  ?.pr * data.quantity || data.price[0].pr * data.quantity
              }
            />
          </div>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
