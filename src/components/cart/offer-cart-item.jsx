import { X, Minus, Plus } from "lucide-react";

import useCart from "../../hooks/use-cart";
import Currency from "../ui/currency";
import IconButton from "../ui/icon-button";

function OfferCartItem({ data }) {
  const { removeOfferItem, increaseOfferQuantity, decreaseOfferQuantity } =
    useCart();

  const onRemove = () => {
    removeOfferItem(data.id, data.items);
  };

  const onIncrease = () => {
    increaseOfferQuantity(data.id);
  };

  const onDecrease = () => {
    decreaseOfferQuantity(data.id);
  };

  const imgURL = data?.image.replace(
    "undefined",
    `${import.meta.env.VITE_REACT_IMAGES_URL}/`
  );

  return (
    <li className="flex flex-wrap items-center justify-center w-full py-3 px-2 text-white bg-black/90 rounded-lg border-y border-y-[#d4662297] shadow-sm shadow-[#d4662290]">
      {/* Image */}
      {imgURL && (
        <img
          src={imgURL}
          loading="lazy"
          alt="Offer Image"
          className="object-fill w-full rounded aspect-square max-w-[220px] max-h-40"
        />
      )}

      <div className="relative flex flex-col self-center flex-1 w-full space-y-3 sm:ml-6">
        <div className="flex items-center justify-between w-full gap-x-2">
          {/* Title */}
          <p className="text-3xl font-semibold capitalize">{data?.name}</p>

          {/* Group names */}
          <div className="flex flex-wrap items-center justify-center gap-1">
            {data.GroupsID.map((group) => (
              <p
                key={group._id}
                className="p-1 text-sm text-center rounded bg-orange-800/90">
                {group.name}
              </p>
            ))}
          </div>

          {/* Remove Button */}
          <IconButton
            className="self-center text-white border-2 rounded-full hover:bg-red-600 h-fit"
            onClick={onRemove}
            icon={<X size={15} />}
          />
        </div>

        {/* Products Title */}
        <div className="flex flex-wrap items-center justify-center w-full gap-2">
          {data.items.map((item) => (
            <span
              key={item._id}
              className="p-1 font-semibold text-center rounded line-clamp-4 text-md text-neutral-300 bg-white/40 w-fit">
              {item.title}
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
