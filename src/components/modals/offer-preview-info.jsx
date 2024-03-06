import { ShoppingCart } from "lucide-react";
import { useState } from "react";

import useCart from "../../hooks/use-cart";
import Currency from "../ui/currency";

const OfferPreviewInfo = ({ data }) => {
  const [selectedSize, setSelectedSize] = useState(data.price[0]?.size);
  const [selectedDough, setSelectedDough] = useState("");

  const { addItem } = useCart();

  const productsList = data.productsID?.map((product) => (
    <div
      key={product.id}
      className="flex flex-col pb-1 md:border-r md:border-b-0 xs:border-b xs:border-r-0 gap-y-2">
      <div className="flex gap-1">
        <img
          className="w-24 h-20 rounded"
          src={product.imageCover.replace(
            "undefined",
            "http://localhost:8000/"
          )}
        />
        <p className="p-1 font-semibold rounded bg-white/20 w-fit h-fit">
          {product.title}
        </p>
      </div>
      <p>{product.description}</p>
    </div>
  ));

  return (
    <section className="container flex flex-col w-full gap-2">
      {/* Name & Price */}
      <div className="flex items-center justify-between my-3">
        <p className="text-2xl">{data.name}</p>
        <span className="p-1 rounded shadow-sm bg-white/30 shadow-orange-400">
          <Currency value={data.price} />
        </span>
      </div>
      <hr className="my-2" />
      <div className="flex items-end sm:flex-row xs:flex-col sm:gap-6 xs:gap-3 sm:mb-4 sm:justify-between">
        <div className="flex justify-center gap-2 md:flex-row xs:flex-col xs:space-y-2">
          {productsList}
        </div>
      </div>
      {/* Add Button */}
      <button
        onClick={() => addItem(data, selectedSize, selectedDough)}
        disabled={data.category?.name === "pizza" && !selectedDough}
        className="flex w-fit self-end items-center gap-2 h-fit bg-white/20 hover:bg-white/40 p-2 hover:shadow-[0_2px_5px_rgba(211,_84,0,_.8)] transition-all  duration-300 rounded-sm hover:rounded-2xl disabled:cursor-not-allowed">
        Add To Cart
        <ShoppingCart size={20} />
      </button>
    </section>
  );
};
export default OfferPreviewInfo;
