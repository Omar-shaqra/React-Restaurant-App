import { ShoppingCart } from "lucide-react";

import useCart from "../../hooks/use-cart";
import Currency from "../ui/currency";

const OfferPreviewInfo = ({ data }) => {
  const { addOfferItem } = useCart();

  const productsList = data.productsID?.map((product) => (
    <div key={product.id} className="flex flex-col pb-1 border-b-2 gap-y-2">
      <div className="flex gap-1">
        <img
          className="w-24 h-20 rounded"
          src={product.imageCover.replace(
            "undefined",
            "http://91.108.102.253:8000/"
          )}
          // src={product.imageCover}
        />
        <p className="p-1 font-semibold rounded bg-white/20 w-fit h-fit">
          {product.title}
        </p>
      </div>
      <p className="w-5/6 text-sm text-gray-300 text-wrap">
        {product.description}
      </p>
    </div>
  ));

  return (
    <section className="flex flex-col w-full gap-2">
      {/* Name & Price */}
      <div className="flex items-center justify-between w-full mt-5 ">
        <p className="text-2xl">{data.name}</p>
        <span className="p-1 rounded shadow-sm w-fit bg-white/30 shadow-orange-400">
          <Currency value={data.price} />
        </span>
      </div>
      <hr className="my-2" />
      {/* Products */}
      <div className="flex items-end sm:gap-6 xs:gap-3 sm:mb-4 sm:justify-between">
        <div className="flex flex-col justify-center gap-2 xs:space-y-2">
          {productsList}
        </div>
      </div>

      <div className="flex items-center justify-end gap-1">
        {/* Add Button */}
        <button
          onClick={() => addOfferItem(data)}
          // disabled={data.category?.name === "pizza" && !selectedDough}
          className="flex flex-1 max-w-60 self-end  mx-2 justify-between items-center gap-2 h-fit bg-white/20 hover:bg-white/40 p-2 hover:shadow-[0_2px_5px_rgba(211,_84,0,_.8)] transition-all duration-500 rounded-md hover:rounded-2xl disabled:cursor-not-allowed">
          Add To Cart
          <ShoppingCart size={20} />
        </button>
      </div>
    </section>
  );
};
export default OfferPreviewInfo;
