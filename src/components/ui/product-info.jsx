import { ShoppingCart } from "lucide-react";

import useCart from "../../hooks/use-cart";
import Currency from "../ui/currency";
import { useState } from "react";

const ProductInfo = ({ data }) => {
  const [selectedSize, setSelectedSize] = useState(data.price[0].size);
  const [selectedDough, setSelectedDough] = useState("");

  const { addItem } = useCart();

  // const addToCart = () => {
  //   addItem(data, selectedSize, selectedDough);
  // };

  return (
    <section className="flex flex-col container gap-2 w-full">
      <div className="my-3 flex items-end justify-between">
        <div className="text-2xl">{data.title}</div>
        <Currency
          value={
            data.price.find((price) => price.size === selectedSize)?.pr ||
            data.price[0].pr
          }
        />
      </div>
      {/* Description */}
      <p className="text-sm text-gray-300 w-5/6 text-wrap">
        {data.description}
      </p>
      <hr className="my-2" />
      <div className="flex sm:flex-row xs:flex-col sm:gap-6 xs:gap-3 sm:mb-4 sm:justify-between items-end">
        <div className="flex flex-col self-center gap-y-6 ">
          {/* Sizes */}
          {data.price[1]?.size && (
            <div className="flex space-x-8 items-center gap-x-2 ">
              <h3 className="font-semibold ">Size:</h3>
              <div className="flex space-x-6 gap-1 font-semibold font-mono">
                {/* Basic */}
                {data?.price[0] && (
                  <div
                    className={`flex items-center gap-1 p-1 rounded cursor-pointer bg-white/20  ${
                      selectedSize === data.price[0].size ? "selected-size" : ""
                    }`}
                    onClick={() => document.querySelector(".size").click()}>
                    <input
                      type="radio"
                      name="size"
                      checked={selectedSize === data.price[0].size}
                      onChange={() => setSelectedSize(data.price[0].size)}
                      value={data.price[0].size}
                      className="size hidden"
                    />
                    <div className="flex flex-col items-center ">
                      <p>{data.price[0].size}</p>
                      <Currency value={data.price[0].pr} />
                    </div>
                  </div>
                )}
                {/* Mid */}
                {data.price[1]?.size && (
                  <div
                    className={`flex items-center gap-1 p-1 rounded cursor-pointer bg-white/20 ${
                      selectedSize === data.price[1].size ? "selected-size" : ""
                    }`}
                    onClick={() => document.querySelector(".size1").click()}>
                    <input
                      type="radio"
                      name="size"
                      checked={selectedSize === data.price[1].size}
                      onChange={() => setSelectedSize(data.price[1].size)}
                      value={data.price[1].size}
                      className="size1 hidden"
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
                    className={`flex items-center gap-1 p-1 rounded cursor-pointer bg-white/20 ${
                      selectedSize === data.price[2].size ? "selected-size" : ""
                    }`}
                    onClick={() => document.querySelector(".size2").click()}>
                    <input
                      type="radio"
                      name="size"
                      checked={selectedSize === data.price[2].size}
                      onChange={() => setSelectedSize(data.price[2].size)}
                      value={data.price[2].size}
                      className="size2 hidden"
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
              <div className="flex space-x-8 gap-x-2 container">
                <h3 className="font-semibold">Dough:</h3>
                <div className="flex space-x-5 gap-1 font-semibold font-mono ">
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
        {/* Add Button */}
        <button
          onClick={() => addItem(data, selectedSize, selectedDough)}
          disabled={data.category?.name === "pizza" && !selectedDough}
          className="flex items-center gap-2 h-fit bg-white/20 hover:bg-white/40 p-2 hover:shadow-[0_2px_5px_rgba(211,_84,0,_.8)] transition duration-300 rounded-xl disabled:cursor-not-allowed">
          Add To Cart
          <ShoppingCart size={20} />
        </button>
      </div>
    </section>
  );
};
export default ProductInfo;
