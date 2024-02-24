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

  const imgSrc =
    imageCover && imageCover.replace("undefined", "http://localhost:8000");

  return (
    <section className="m-1 flex justify-center text-white" onClick={onPreview}>
      <div className="p-1 w-full bg-white/30 rounded-lg group cursor-pointer border border-opacity-50 border-orange-200 ">
        {image == "visible" && (
          <img
            src={imgSrc}
            alt="Pizza"
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
              {category ? category.name : "category"}
            </p>
            <ShoppingBag className="block md:hidden size-auto p-1 overflow-visible bg-orange-300 text-black rounded-full border-2 border-red-300 transition hover:border-orange-600 hover:scale-105" />
          </div>
        </div>
        {/* Prices & Button */}
        <div className="flex items-center justify-between">
          <div className="flex justify-between mt-1 md:text-sm xs:text-[10px] xs:gap-1 ">
            <div className="flex flex-col items-center p-1 bg-white/20 rounded">
              <p className="text-gray-300">Basic</p>
              <Currency value={price[0] ? price[0].pr : ""} />
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

// <section className="relative p-4 container h-fit" onClick={onPreview}>
//   <div className="group cursor-pointer rounded-md border  px-3 shadow-md text-white">
//     {/* Image & actions */}
//     <div className="rounded-xl">
//       {imgSrc ? (
//         <img
//           className="aspect-square pt-3 object- object-contain"
//           loading="lazy"
//           src={imgSrc}
//           alt="combos images"
//         />
//       ) : (
//         <img src="" alt="Loading" />
//       )}
//     </div>
//     {/* Description */}
//     <div className="flex flex-row justify-between pb-8 pt-2">
//       <div className="flex flex-col gap-1 items-start">
//         {/* <p className="font-semibold text-lg">name</p> */}
//         <p className="font-semibold text-lg ">{title ? title : "title"}</p>
//         {/* <p className="text-sm ">category</p> */}
//         <p className="text-sm">{category ? category.name : "category"}</p>
//       </div>
//       {/* Price */}
//       <Currency value={price ? price : {}} />
//     </div>
//   </div>
//   {button === "add" ? (
//     <button
//       className="absolute group p-2 w-fit -bottom-2 2xl:ml-24 xl:ml-24 lg:ml-[72px] md:ml-8 sm:ml-16 my-2 bg-[#e89a4f] hover:bg-[#efbe82] rounded-full transition duration-200 text-[#3d190d]"
//       //! onClick={() => {
//       //!   addToCart(data);
//       //! }}
//     >
//       <div className="flex items-center text-nowrap gap-2 px-1 font-serif font-semibold text-neutral-700 transition duration-200">
//         Add to Cart
//         <ShoppingBag className="group-hover:animate-bounce" />
//       </div>
//     </button>
//   ) : (
//     <div className="flex items-center justify-center">
//       <button
//         className="rounded-full px-2 p-1 mt-3 flex items-center gap-2
//       text-base text-center bg-black/70 text-white border border-red-300 transition hover:border-red-800 hover:scale-105"
//         onClick={() => {
//           deleteItem({ id: _id, routeName: "products" }).then(() => {
//             refetch();
//           });
//         }}>
//         Delete
//         <Trash2 size={20} />
//       </button>
//     </div>
//   )}
// </section>
