import Currency from "./currency";
import { ShoppingBag } from "lucide-react";
import combImg from "/src/assets/75-Combo.png";
// import { useNavigate } from "react-router-dom";

import useCart from "../../hooks/use-cart";

const DealCard = ({ data }) => {
  const cart = useCart();
  // const navigate = useNavigate();

  const handleClick = () => {
    // navigate(`/product/${data.id}`);
  };
  const addToCart = () => {
    cart.addItem(data);
  };

  return (
    <section className="relative w-fit p-4" onClick={handleClick}>
      <div className="group cursor-pointer rounded-xl border border-rose-200 p-3 space-y-4 shadow-md">
        {/* Image & actions */}
        <div className="w-60 rounded-xl mx-auto">
          <img
            src={combImg}
            alt="combos images"
            className="absloute aspect-square object-cover rounded-md"
          />
          <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5"></div>
        </div>
        {/* Description */}
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-lg">name</p>
            <p className="text-sm text-gray-500">category</p>
          </div>
          <Currency value={data?.price} />
        </div>
        {/* Price & Reiew */}
      </div>
      <button className="absolute group p-2 -bottom-2 ml-16 my-2 bg-amber-300 hover:bg-orange-400 rounded-full transition duration-200">
        <div
          onClick={addToCart}
          className="flex items-center gap-3 px-2 font-serif font-semibold text-neutral-700 group-hover:text-white transition duration-200">
          Add to Cart
          <ShoppingBag className="group-hover:animate-bounce" />
        </div>
      </button>
    </section>
  );
};

export default DealCard;
