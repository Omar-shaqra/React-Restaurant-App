import { X, Minus, Plus } from "lucide-react";

import useCart from "../../hooks/use-cart";
import Currency from "../ui/currency";
import IconButton from "../ui/icon-button";

function ProductCartItem({ data }) {
  const { increaseQuantity, decreaseQuantity, removeItem } = useCart();

  const onIncrease = () => {
    increaseQuantity(data.id, data.selectedSize, data.selectedDough);
  };
  const onDecrease = () => {
    decreaseQuantity(data.id, data.selectedSize, data.selectedDough);
  };
  const onRemove = () => {
    removeItem(data.id, data.selectedSize, data.selectedDough);
  };

  const imgSrc = data?.imageCover?.replace(
    "undefined",
    "http://localhost:8000"
  );

  return (
    <li className="flex sm:flex-row xs:flex-col w-full items-center p-3 text-white bg-black/90 rounded-lg border-y border-y-[#d4662297] shadow-sm shadow-[#d4662290]">
      {/* Image */}
      <div className="flex items-center justify-center w-64 h-48 overflow-hidden rounded-xl">
        {imgSrc && (
          <img
            className="object-contain object-center w-full rounded-md aspect-square"
            loading="lazy"
            src={imgSrc}
            alt="combos images"
          />
        )}
      </div>

      <div className="relative flex flex-col self-center flex-1 gap-2 space-y-2 sm:ml-6">
        {/* Title, Size */}
        <div className="flex justify-between gap-2">
          <div className="flex items-center gap-2">
            <p className="text-3xl capitalize font-semibold">
              {data ? data.title : "product name"}
            </p>
            <p className="p-1 rounded bg-orange-800/90">{data.selectedSize}</p>
            {data.selectedDough && (
              <p className="p-1 rounded bg-orange-800/70">
                {data.selectedDough}
              </p>
            )}
            <p className="p-1 rounded bg-orange-800/50">x{data.quantity}</p>
          </div>
          {/* X Button */}
          <IconButton
            className="self-center text-white border-2 rounded-full hover:bg-red-600 h-fit"
            onClick={onRemove}
            icon={<X size={15} />}
          />
        </div>

        {/* Description */}
        <p className="p-1 font-semibold text-justify rounded line-clamp-4 text-md text-neutral-300 bg-white/40 w-fit">
          {data ? data.description : "product name"}
        </p>

        {/* Price & Quantity */}
        <div className="flex justify-between gap-2">
          <div className="flex flex-row items-center gap-x-2">
            <IconButton
              className="text-white border-2 rounded-full hover:bg-green-600"
              onClick={onIncrease}
              icon={<Plus size={15} />}
            />
            <p className="p-2 rounded select-none bg-white/20">
              {data.quantity}
            </p>
            <IconButton
              className="text-white border-2 rounded-full hover:bg-red-600"
              onClick={onDecrease}
              icon={<Minus size={15} />}
            />
          </div>
          {/* Price */}
          <div className="flex items-center p-1 border-2 border-orange-500 rounded border-opacity-30 w-fit bg-neutral-800">
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

export default ProductCartItem;
