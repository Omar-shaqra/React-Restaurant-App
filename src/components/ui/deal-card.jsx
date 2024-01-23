import Currency from "./currency";
import { ShoppingBag } from "lucide-react";

const handleClick = () => {
  // router.push(`/product/${data?.id}`);
};

const DealCard = ({ data }) => {
  return (
    <div className="flex flex-col relative">
      <div
        onClick={handleClick}
        className="group cursor-pointer rounded-xl border border-rose-200 p-3 space-y-4">
        {/* Image & actions */}
        <div className="w-60 rounded-xl relative">
          <img
            src="/src/assets/75-Combo.png"
            alt="combos images"
            className="abslouteaspect-square object-cover rounded-md"
          />
          <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5"></div>
        </div>
        {/* Description */}
        <div>
          <p className="font-semibold text-lg">name</p>
          <p className="text-sm text-gray-500">category</p>
        </div>
        {/* Price & Reiew */}
        <div className="flex items-center justify-between">
          <Currency value={data?.price} />
        </div>
      </div>
      <div className="absolute group w-fit p-2 bottom-0 translate-x-3/4 mx-1 my-2 bg-amber-300 hover:bg-orange-400 rounded-full transition duration-200">
        <button className="flex items-center gap-2 font-serif font-semibold text-neutral-700 group-hover:text-white transition ">
          Add to Cart
          <ShoppingBag className="group-hover:animate-bounce" />
        </button>
      </div>
    </div>
  );
};

export default DealCard;
