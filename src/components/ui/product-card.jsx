import { ShoppingBag, Trash2 } from "lucide-react";

import { deleteItem } from "../../actions/delete-item";
import { useProductPreviewModal } from "../../hooks/use-preview-modal";
import Currency from "./currency";

const ProductCard = ({ data, image = "visible", button = "add", refetch }) => {
  const previewModal = useProductPreviewModal();

  const onPreview = (e) => {
    e.preventDefault();
    previewModal.onOpen(data);
  };

  const imgSrc = data.imageCover?.replace("undefined", "http://localhost:8000");

  return (
    <section
      className="flex justify-center m-1 text-white capitalize"
      onClick={onPreview}>
      <div className="w-full p-1 border border-orange-200 border-opacity-50 rounded-lg cursor-pointer bg-white/30 group">
        {image == "visible" && (
          <img
            src={imgSrc}
            alt="cart Item"
            className="w-full rounded aspect-square"
          />
        )}
        {/* Title & Cateogry */}
        <div className="flex justify-start mt-2 md:flex-row xs:flex-col md:items-center md:gap-4 xs:gap-1">
          <h5 className="font-semibold xl:text-xl md:text-base sm:text-sm xs:text-xs xs:text-wrap text-nowrap">
            {data.title}
          </h5>
          <div className="flex items-center justify-between">
            <p className="p-1 text-sm text-orange-300 rounded bg-black/50 w-fit h-fit">
              {data.category?.name}
            </p>
            <ShoppingBag className="block p-1 overflow-visible text-black transition bg-orange-300 border-2 border-red-300 rounded-full md:hidden size-auto hover:border-orange-600 hover:scale-105" />
          </div>
        </div>
        {/* Prices & Button */}
        <div className="flex items-center justify-between">
          <div className="flex justify-between mt-1 md:text-sm xs:text-[10px] xs:gap-1">
            <div className="flex flex-col items-center p-1 rounded bg-white/20">
              <p className="text-gray-300">Basic</p>
              <Currency value={data.price[0]?.pr} />
            </div>
            {data.price[1] && (
              <div className="flex flex-col items-center p-1 rounded bg-white/20">
                <p className="text-gray-300">Medium</p>
                <Currency value={data.price[1].pr} />
              </div>
            )}
            {data.price[2] && (
              <div className="flex flex-col items-center p-1 rounded bg-white/20">
                <p className="text-gray-300">Large</p>
                <Currency value={data.price[2].pr} />
              </div>
            )}
          </div>
          {button === "add" ? (
            <ShoppingBag className="hidden overflow-visible text-black transition bg-orange-300 border-2 border-red-300 rounded-full md:block size-auto lg:p-2 md:p-1 hover:border-orange-600 hover:scale-105" />
          ) : (
            <div className="flex items-center justify-center pt-2">
              <button
                className="flex items-center gap-1 p-1 px-2 text-sm text-center text-white transition border border-orange-300 rounded-full bg-black/70 hover:border-red-800 hover:scale-105"
                onClick={() => {
                  deleteItem({ id: data._id, routeName: "products" }).then(
                    () => {
                      refetch();
                    }
                  );
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
