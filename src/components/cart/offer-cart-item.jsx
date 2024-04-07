import { X, Minus, Plus } from "lucide-react";

import useCart from "../../hooks/use-cart";
import Currency from "../ui/currency";
import IconButton from "../ui/icon-button";

function OfferCartItem({ data }) {
  const { removeOfferItem, increaseOfferQuantity, decreaseOfferQuantity } =
    useCart();

  const onRemove = () => {
    removeOfferItem(data.id);
  };

  const onIncrease = () => {
    increaseOfferQuantity(data.id);
  };
  const onDecrease = () => {
    decreaseOfferQuantity(data.id);
  };

  const imgURL = data?.image.replace(
    "undefined",
    "https://restaurant-menue-ordering-v1.onrender.com"
  );

  return (
    <li className="flex flex-wrap w-full items-center p-3 text-white bg-black/90 rounded-lg border-y border-y-[#d4662297] shadow-sm shadow-[#d4662290]">
      {/* Image */}
      <div className="flex items-center justify-center overflow-hidden max-h-48 max-w-64 rounded-xl">
        {imgURL && (
          <img
            className="object-contain object-center w-full rounded-md aspect-square"
            loading="lazy"
            src={imgURL}
            alt="combos images"
          />
        )}
      </div>

      <div className="relative flex flex-col self-center flex-1 w-full gap-2 space-y-2 sm:ml-6">
        {/* Title */}
        <div className="flex justify-between gap-2">
          <p className="text-3xl font-semibold capitalize">{data?.name}</p>
          {/* Remove Button */}
          <IconButton
            className="self-center text-white border-2 rounded-full hover:bg-red-600 h-fit"
            onClick={onRemove}
            icon={<X size={15} />}
          />
        </div>

        {/* Products Title */}
        <div className="flex flex-wrap gap-2">
          {data.productsID.map((product) => (
            <span
              key={product._id}
              className="p-1 font-semibold text-justify rounded line-clamp-4 text-md text-neutral-300 bg-white/40 w-fit">
              {product.title}
            </span>
          ))}
        </div>

        {/* Price & Quantity  */}
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
            <Currency value={data.price * data.quantity} />
          </div>
        </div>
      </div>
    </li>
  );
}

export default OfferCartItem;
