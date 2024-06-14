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

  const imgURL =
    data.imageCover !=
    // Handle No Image Case
    "undefined/products/null"
      ? data.imageCover?.replace(
          "undefined",
          `${import.meta.env.VITE_REACT_IMAGES_URL}/`
        )
      : "/logo.png";

  return (
    <li className="flex flex-wrap justify-center w-full py-3 px-2 text-white bg-black/90 rounded-lg border-y border-y-[#d4662297] shadow-sm shadow-[#d4662290]">
      {/* Image */}
      {imgURL && (
        <img
          src={imgURL}
          loading="lazy"
          alt="Product Image"
          className="object-fill w-full rounded aspect-square max-w-[220px] max-h-[190px]"
        />
      )}

      <div className="relative flex flex-col self-center flex-1 w-full h-full gap-1 space-y-3 sm:ml-6">
        {/* Title & Info */}
        <div className="flex flex-col justify-between gap-2">
          {/* Title & Remove Button */}
          <div className="flex items-start justify-between">
            {data.title && (
              <p className="text-3xl font-semibold capitalize">{data.title}</p>
            )}

            {/* X Button */}
            <IconButton
              className="self-center text-white border-2 rounded-full hover:bg-red-600 h-fit"
              onClick={onRemove}
              icon={<X size={15} />}
            />
          </div>
          {/* Other Info */}
          <div className="flex items-center gap-2">
            <p className="p-1 rounded bg-orange-800/90">{data.selectedSize}</p>
            {data.selectedDough && (
              <p className="p-1 rounded bg-orange-800/70">
                {data.selectedDough}
              </p>
            )}
            <p className="p-1 rounded bg-orange-800/50">x{data.quantity}</p>
          </div>
        </div>

        {/* Description */}
        <div className="p-1 font-semibold rounded w-fit text-md text-neutral-300 bg-white/40">
          <p className="overflow-hidden">
            {data ? data.description : "product description"}
          </p>
        </div>

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
          <div className="flex items-center p-1 border-2 border-orange-500 rounded border-opacity-30 bg-neutral-800">
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
