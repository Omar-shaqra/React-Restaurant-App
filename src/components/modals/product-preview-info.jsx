import { ShoppingCart } from "lucide-react";
import { useState } from "react";

import useCart from "../../hooks/use-cart";
import Currency from "../ui/currency";

const ProductPreviewInfo = ({ data }) => {
  const [selectedSize, setSelectedSize] = useState(data.price[0]?.size);
  const [selectedDough, setSelectedDough] = useState("");

  const { addProductItem } = useCart();

  return (
    <section className="container flex flex-col w-full gap-2">
      <div className="flex items-center justify-between my-3">
        <p className="text-2xl">{data.title}</p>
      </div>
      {/* Description */}
      <p className="w-5/6 text-sm text-gray-300 text-wrap">
        {data.description}
      </p>
      <hr className="my-2" />
      <div className="flex items-end sm:flex-row xs:flex-col sm:gap-6 xs:gap-3 sm:mb-4 sm:justify-between">
        <div className="flex flex-col self-center gap-y-6 ">
          {/* Sizes */}
          {data.price[1]?.size && (
            <div className="flex items-center space-x-8 gap-x-2 ">
              <h3 className="font-semibold ">Size:</h3>
              <div className="flex gap-1 space-x-6 font-mono font-semibold">
                {/* Basic */}
                {data?.price[0] && (
                  <div
                    className={`flex items-center gap-1 p-1 rounded cursor-pointer bg-white/20 hover:bg-orange-400 transition-all duration-300  ${
                      selectedSize === data.price[0].size ? "selected-size" : ""
                    }`}
                    onClick={() => document.querySelector(".size").click()}>
                    <input
                      type="radio"
                      name="size"
                      checked={selectedSize === data.price[0].size}
                      onChange={() => setSelectedSize(data.price[0].size)}
                      value={data.price[0].size}
                      className="hidden size"
                    />
                    <div className="flex flex-col items-center">
                      <p>{data.price[0].size}</p>
                      <Currency value={data.price[0].pr} />
                    </div>
                  </div>
                )}
                {/* Mid */}
                {data.price[1]?.size && (
                  <div
                    className={`flex items-center gap-1 p-1 rounded cursor-pointer bg-white/20 hover:bg-orange-400 transition-all duration-300 ${
                      selectedSize === data.price[1].size ? "selected-size" : ""
                    }`}
                    onClick={() => document.querySelector(".size1").click()}>
                    <input
                      type="radio"
                      name="size"
                      checked={selectedSize === data.price[1].size}
                      onChange={() => setSelectedSize(data.price[1].size)}
                      value={data.price[1].size}
                      className="hidden size1"
                    />
                    <div className="flex flex-col items-center ">
                      <p>{data.price[1].size}</p>
                      <Currency value={data.price[1].pr} />
                    </div>
                  </div>
                )}
                {/* Large */}
                {data.price[2]?.size && (
                  <div
                    className={`flex items-center gap-1 p-1 rounded cursor-pointer bg-white/20 hover:bg-orange-400 transition-all duration-300 ${
                      selectedSize === data.price[2].size ? "selected-size" : ""
                    }`}
                    onClick={() => document.querySelector(".size2").click()}>
                    <input
                      type="radio"
                      name="size"
                      checked={selectedSize === data.price[2].size}
                      onChange={() => setSelectedSize(data.price[2].size)}
                      value={data.price[2].size}
                      className="hidden size2"
                    />
                    <div className="flex flex-col items-center ">
                      <p>{data.price[2].size}</p>
                      <Currency value={data.price[2].pr} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {/* Dough Type */}
          {data.category?.name === "Pizza" ||
            (data.category?.name === "pizza" && (
              <div className="container flex space-x-8 gap-x-2">
                <h3 className="font-semibold">Dough:</h3>
                <div className="flex gap-1 space-x-5 font-mono font-semibold ">
                  <input
                    type="radio"
                    name="dough"
                    value="classic"
                    className="hover:cursor-pointer "
                    onChange={() => setSelectedDough("classic")}
                  />
                  Classic
                  <input
                    type="radio"
                    name="dough"
                    value="crust"
                    className="hover:cursor-pointer"
                    onChange={() => setSelectedDough("crust")}
                  />
                  Crust
                  <input
                    type="radio"
                    name="dough"
                    value="thin"
                    className="hover:cursor-pointer"
                    onChange={() => setSelectedDough("thin")}
                  />
                  Thin
                </div>
              </div>
            ))}
        </div>

        <div className="flex md:flex-col xs:flex-row gap-1">
          <span className="p-1 w-fit self-center rounded shadow-sm bg-white/30 shadow-orange-400">
            <Currency
              value={
                data.price.find((price) => price.size === selectedSize)?.pr ||
                data.price[0].pr
              }
            />
          </span>
          {/* Add Button */}
          <button
            onClick={() => addProductItem(data, selectedSize, selectedDough)}
            disabled={data.category?.name === "pizza" && !selectedDough}
            className="flex items-center gap-2 h-fit bg-white/20 hover:bg-white/40 p-2 hover:shadow-[0_2px_5px_rgba(211,_84,0,_.8)] transition-all duration-500 md:rounded-none xs:rounded rounded-sm hover:rounded-2xl disabled:cursor-not-allowed">
            Add To Cart
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};
export default ProductPreviewInfo;
