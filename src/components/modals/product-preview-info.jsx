import { ShoppingCart } from "lucide-react";
import { useState } from "react";

import useCart from "../../hooks/use-cart";
import Currency from "../ui/currency";

const ProductPreviewInfo = ({ data }) => {
  const [selectedSize, setSelectedSize] = useState(data.price[0]?.size);
  const [selectedDough, setSelectedDough] = useState("classic");

  const { addProductItem } = useCart();

  return (
    <section className="flex flex-col w-full gap-2">
      <div className="flex items-center justify-between my-3">
        <p className="text-2xl">{data.title}</p>
        <span className="self-center p-1 rounded shadow-sm w-fit bg-white/30 shadow-orange-400">
          <Currency
            value={
              data.price.find((price) => price.size === selectedSize)?.pr ||
              data.price[0].pr
            }
          />
        </span>
      </div>
      {/* Description */}
      <p className="w-5/6 text-sm text-gray-300 text-wrap">
        {data.description}
      </p>
      <hr className="my-2" />

      {/* Bottom section */}
      <div className="flex flex-col items-center w-full md:flex-row gap-y-3">
        {/* Size & Dough */}
        <div className="flex self-center w-full gap-6 md:flex-col">
          {/* Sizes */}
          {data.price[1]?.size && (
            <div className="flex-wrap items-center gap-x-2">
              <h3 className="font-semibold ">Size:</h3>
              <div className="flex flex-col gap-1 space-x-6 font-mono font-semibold md:flex-row">
                {/* Basic */}
                {data?.price[0] && (
                  <div
                    className={` w-fit  self-end flex items-center gap-1 p-1 rounded cursor-pointer bg-white/20 hover:bg-orange-400 transition-all duration-300  ${
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
          {data.category?.name === "Pizza" && (
            <div className="flex-wrap items-center gap-x-2">
              <h3 className="font-semibold">Dough:</h3>
              <div className="flex flex-col items-center gap-1 font-mono font-semibold text-center md:flex-row">
                {/* Classic */}
                <div
                  className={`flex text-center items-center justify-center h-[52px] w-full gap-1 p-1 rounded cursor-pointer bg-white/20 hover:bg-orange-400 transition-all duration-300 ${
                    selectedDough === "classic" ? "selected-size" : ""
                  }`}
                  onClick={() => setSelectedDough("classic")}>
                  <input
                    type="radio"
                    name="dough"
                    value="classic"
                    checked={selectedDough === "classic"}
                    onChange={() => setSelectedDough("classic")}
                    className="hidden classic"
                  />
                  <p>Classic</p>
                </div>
                {/* Crust */}
                <div
                  className={`flex text-center items-center justify-center h-[52px] w-full gap-1 p-1 rounded cursor-pointer bg-white/20 hover:bg-orange-400 transition-all duration-300 ${
                    selectedDough === "crust" ? "selected-size" : ""
                  }`}
                  onClick={() => setSelectedDough("crust")}>
                  <input
                    type="radio"
                    name="dough"
                    value="crust"
                    checked={selectedDough === "crust"}
                    onChange={() => setSelectedDough("crust")}
                    className="hidden crust"
                  />
                  <p>Crust</p>
                </div>
                {/* Thin */}
                <div
                  className={`flex text-center items-center justify-center h-[52px] w-full gap-1 p-1 rounded cursor-pointer bg-white/20 hover:bg-orange-400 transition-all duration-300 ${
                    selectedDough === "thin" ? "selected-size" : ""
                  }`}
                  onClick={() => setSelectedDough("thin")}>
                  <input
                    type="radio"
                    name="dough"
                    value="thin"
                    checked={selectedDough === "thin"}
                    onChange={() => setSelectedDough("thin")}
                    className="hidden thin"
                  />
                  <p>Thin</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Add Button */}
        <button
          onClick={() => addProductItem(data, selectedSize, selectedDough)}
          disabled={data.category?.name === "pizza" && !selectedDough}
          className="text-nowrap flex flex-1 max-w-60 self-end  mx-2 justify-between items-center gap-2 h-fit bg-white/20 hover:bg-white/40 p-2 hover:shadow-[0_2px_5px_rgba(211,_84,0,_.8)] transition-all duration-500 rounded-md hover:rounded-2xl disabled:cursor-not-allowed">
          Add To Cart
          <ShoppingCart size={20} />
        </button>
      </div>
    </section>
  );
};
export default ProductPreviewInfo;
