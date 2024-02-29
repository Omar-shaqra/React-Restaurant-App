import { ShoppingBag, Trash2 } from "lucide-react";

import { deleteItem } from "../../actions/delete-item";
import usePreviewModal from "../../hooks/use-preview-modal";
import Currency from "./currency";

const ProductCard = ({
  _id,
  title,
  imageCover,
  category,
  price,
  data,
  image = "visible",
  button = "add",
  refetch,
}) => {
  const previewModal = usePreviewModal();

  const onPreview = (e) => {
    e.preventDefault();

    previewModal.onOpen(data);
  };

  const imgSrc = imageCover?.replace("undefined", "http://localhost:8000");

  return (
    <section className="m-1 flex justify-center text-white" onClick={onPreview}>
      <div className="p-1 w-full bg-white/30 rounded-lg group cursor-pointer border border-opacity-50 border-orange-200">
        {image == "visible" && (
          <img
            src={imgSrc}
            alt="cart Item"
            className="aspect-square w-full rounded"
          />
        )}
        {/* Title & Cateogry */}
        <div className="flex md:flex-row xs:flex-col md:items-center justify-start md:gap-4 xs:gap-1 mt-2">
          <h5 className="xl:text-xl md:text-base sm:text-sm xs:text-xs xs:text-wrap font-semibold text-nowrap">
            {title}
          </h5>
          <div className="flex justify-between items-center">
            <p className="text-sm bg-black/50 rounded w-fit p-1 h-fit text-orange-300">
              {category?.name}
            </p>
            <ShoppingBag className="block md:hidden size-auto p-1 overflow-visible bg-orange-300 text-black rounded-full border-2 border-red-300 transition hover:border-orange-600 hover:scale-105" />
          </div>
        </div>
        {/* Prices & Button */}
        <div className="flex items-center justify-between">
          <div className="flex justify-between mt-1 md:text-sm xs:text-[10px] xs:gap-1">
            <div className="flex flex-col items-center p-1 bg-white/20 rounded">
              <p className="text-gray-300">Basic</p>
              <Currency value={price[0]?.pr} />
            </div>
            {price[1] && (
              <div className="flex flex-col items-center p-1 bg-white/20 rounded">
                <p className="text-gray-300">Medium</p>
                <Currency value={price[1].pr} />
              </div>
            )}
            {price[2] && (
              <div className="flex flex-col items-center p-1 bg-white/20 rounded">
                <p className="text-gray-300">Large</p>
                <Currency value={price[2].pr} />
              </div>
            )}
          </div>
          {button === "add" ? (
            <ShoppingBag className="hidden md:block size-auto lg:p-2 md:p-1 overflow-visible bg-orange-300 text-black rounded-full border-2 border-red-300 transition hover:border-orange-600 hover:scale-105" />
          ) : (
            <div className="flex items-center justify-center pt-2">
              <button
                className="rounded-full px-2 p-1 flex items-center gap-1
                text-sm text-center bg-black/70 text-white border border-orange-300 transition hover:border-red-800 hover:scale-105"
                onClick={() => {
                  deleteItem({ id: _id, routeName: "products" }).then(() => {
                    refetch();
                  });
                }}>
                Delete
                <Trash2 size={15} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
