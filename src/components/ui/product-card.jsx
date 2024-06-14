import { Eye, EyeOff, SquarePen, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { deleteItem } from "../../actions/delete-item";
import { useProductPreviewModal } from "../../hooks/use-preview-modal";
import Currency from "./currency";
import IconButton from "./icon-button";
import { hideItem } from "../../actions/hide-item";

const ProductCard = ({ data, image = "user", button = "add", refetch }) => {
  const previewModal = useProductPreviewModal();
  const navigate = useNavigate();

  const onPreview = (e) => {
    e.preventDefault();
    previewModal.onOpen(data);
  };

  const onHide = () => {
    hideItem({ id: data._id, active: data.Active }).then(() => {
      refetch();
    });
  };

  const onEdit = () => {
    navigate(`/admin/product/${data.id}`);
  };

  const onDelete = () => {
    deleteItem({ id: data._id, routeName: "products" }).then(() => {
      refetch();
    });
  };

  const imgURL =
    data.imageCover !=
    // Handle No Image Case
    "undefined/products/null"
      ? data.imageCover?.replace(
          "undefined",
          `${import.meta.env.VITE_REACT_IMAGES_URL}`
        )
      : "/logo.png";

  return (
    <section
      className="flex justify-center m-1 overflow-hidden text-white capitalize"
      onClick={onPreview}>
      <div className="w-full p-1 border border-orange-200 border-opacity-50 rounded-lg cursor-pointer bg-white/30 group">
        {/* User View: Image & Category */}
        <div className="relative">
          {image == "user" && (
            <img
              src={imgURL}
              alt="cart Item"
              className="w-full bg-white rounded aspect-square"
            />
          )}
          <p className="absolute top-0 right-0 p-1 m-px text-sm font-normal text-orange-300 rounded bg-black/70 ">
            {data.category?.name}
          </p>
        </div>
        <div className="flex w-full gap-3">
          {/* Admin View: Image */}
          {image == "admin" && (
            <img
              src={imgURL}
              alt="cart Item"
              className="bg-white rounded w-28 h-[90px]"
            />
          )}

          <div className="flex flex-col w-full">
            {/* Title */}
            <div className="flex flex-col self-center gap-1 overflow-x-auto se hide-scrollbar">
              <h5 className="font-semibold text-nowrap xl:text-lg md:text-base sm:text-sm xs:text-xs">
                {data.title}
              </h5>
            </div>

            {/* Prices & Admin Buttons */}
            <div className="flex items-end">
              {/* Prices */}
              <div className="flex w-full justify-center items-center mt-1 text-[10px] gap-1 ">
                {/* Basic Price */}
                <div className="flex flex-col items-center p-1 rounded h-fit bg-white/20">
                  <p className="text-gray-300">Basic</p>
                  <Currency value={data.price[0]?.pr} />
                </div>
                {/* Mid Price */}
                {data.price[1] && (
                  <div className="flex flex-col items-center p-1 rounded h-fit bg-white/20">
                    <p className="text-gray-300">Medium</p>
                    <Currency value={data.price[1].pr} />
                  </div>
                )}
                {/* Large Price */}
                {data.price[2] && (
                  <div className="flex flex-col items-center p-1 rounded bg-white/20">
                    <p className="text-gray-300">Large</p>
                    <Currency value={data.price[2].pr} />
                  </div>
                )}
              </div>

              {/* Admin View: Buttons */}
              {button == "delete" && (
                <div className="z-10 flex justify-end w-full gap-1">
                  {/* Eye Icon */}
                  {data.Active == true ? (
                    <div className="flex flex-col items-center">
                      <p className="text-xs">VISIBLE</p>
                      <IconButton
                        className="p-1 px-2 transition border border-orange-300 rounded-full bg-black/70 hover:border-red-800 hover:scale-105"
                        onClick={onHide}
                        icon={<Eye size={15} />}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center ">
                      <p className="text-xs">HIDDEN</p>
                      <IconButton
                        className="p-1 px-2 transition border border-orange-300 rounded-full bg-black/70 hover:border-red-800 hover:scale-105"
                        onClick={onHide}
                        icon={<EyeOff size={15} />}
                      />
                    </div>
                  )}

                  {/* Edit Icon */}
                  <span className="flex flex-col items-center">
                    <p className="text-xs">EDIT</p>
                    <IconButton
                      className="p-1 px-2 transition border border-orange-300 rounded-full group bg-black/70 hover:border-red-800 hover:scale-105"
                      onClick={onEdit}
                      icon={<SquarePen size={15} />}
                    />
                  </span>

                  {/* Delete Icon */}
                  <span className="flex flex-col items-center">
                    <p className="text-xs">DELETE</p>

                    <IconButton
                      className="p-1 px-2 transition border border-orange-300 rounded-full bg-black/70 hover:border-red-800 hover:scale-105"
                      onClick={onDelete}
                      icon={<Trash2 size={15} />}
                    />
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
