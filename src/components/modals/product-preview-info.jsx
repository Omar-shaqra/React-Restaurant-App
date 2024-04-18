import { ShoppingCart } from "lucide-react";
import { useState } from "react";

import useCart from "../../hooks/use-cart";
import Currency from "../ui/currency";

const ProductPreviewInfo = ({ data }) => {
  const [selectedSize, setSelectedSize] = useState(data.price[0]?.size);
  const [selectedDough, setSelectedDough] = useState("classic");

  const { addProductItem } = useCart();

  const renderSizes = (sizeData, index) => {
    const handleClick = (selectedSize, sizeIndex) => {
      setSelectedSize(selectedSize);
      document.querySelector(`.size${sizeIndex}`).click();
    };

    return (
      <div
        key={index}
        className={`w-full flex justify-center h-[52px] gap-1 p-1 rounded cursor-pointer bg-white/20 hover:bg-orange-400 transition-all duration-300 ${
          selectedSize === sizeData.size ? "selected-size" : ""
        }`}
        onClick={() => handleClick(sizeData.size, index)}>
        <input
          type="radio"
          name="size"
          checked={selectedSize === sizeData.size}
          onChange={() => setSelectedSize(sizeData.size)}
          value={sizeData.size}
          className={`hidden size${index}`}
        />
        <div className="flex flex-col items-center">
          <p>{sizeData.size}</p>
          <Currency value={sizeData.pr} />
        </div>
      </div>
    );
  };

  const renderDoughType = (doughType) => {
    const handleClick = (selectedDough) => {
      setSelectedDough(selectedDough);
    };

    return (
      <div
        className={`flex text-center items-center justify-center h-[52px] w-full gap-1 p-1 rounded cursor-pointer bg-white/20 hover:bg-orange-400 transition-all duration-300 ${
          selectedDough === doughType ? "selected-size" : ""
        }`}
        onClick={() => handleClick(doughType)}>
        <input
          type="radio"
          name="dough"
          value={doughType}
          checked={selectedDough === doughType}
          onChange={() => handleClick(doughType)}
          className="hidden"
        />
        <p>{doughType}</p>
      </div>
    );
  };

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
      <div className="flex flex-col items-center justify-between md:flex-row md:justify-between gap-y-3">
        {/* Size & Dough */}
        <div className="flex justify-between gap-6 md:flex-col">
          {/* Sizes */}
          {data.price[0]?.size && (
            <div className="flex-wrap items-center gap-x-2">
              <h3 className="font-semibold ">Size:</h3>
              <div className="flex flex-col items-center gap-1 font-mono font-semibold text-center sm:gap-4 sm:flex-row">
                {data.price
                  .slice(0, 3)
                  .map(
                    (price, index) => price.size && renderSizes(price, index)
                  )}
              </div>
            </div>
          )}

          {/* Dough Type */}
          {data.category?.name === "pizza" && (
            <div className="flex-wrap items-center gap-x-2">
              <h3 className="font-semibold">Dough:</h3>
              <div className="flex flex-col items-center gap-1 font-mono font-semibold text-center sm:gap-4 sm:flex-row">
                {["classic", "crust", "thin"].map((doughType) =>
                  renderDoughType(doughType)
                )}
              </div>
            </div>
          )}
        </div>

        {/* Add Button */}
        <button
          onClick={() => addProductItem(data, selectedSize, selectedDough)}
          disabled={data.category?.name === "pizza" && !selectedDough}
          className="text-nowrap flex flex-1 max-w-60 self-center sm:self-end mx-2 justify-between items-center gap-2 h-fit bg-white/20 hover:bg-white/40 p-2 hover:shadow-[0_2px_5px_rgba(211,_84,0,_.8)] transition-all duration-500 rounded-md hover:rounded-2xl disabled:cursor-not-allowed">
          Add To Cart
          <ShoppingCart size={20} />
        </button>
      </div>
    </section>
  );
};
export default ProductPreviewInfo;
