import { SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import IconButton from "../ui/icon-button";

function SubcategoryItem({ item, deleteItem, refetch }) {
  const [hoverd, setIsHoverd] = useState(false);
  const navigate = useNavigate();

  const onEdit = () => {
    navigate(`/admin/subcategories/${item._id}`);
  };
  const onDelete = () => {
    deleteItem({ id: item._id, routeName: "subcategories" }).then(() => {
      refetch();
    });
  };

  return (
    <div
      className="relative flex items-center justify-center h-10 p-2 capitalize transition duration-300 rounded-full cursor-default bg-red-800/70 whitespace-nowrap hover:scale-110 group"
      key={item.id}
      onMouseEnter={() => setIsHoverd(true)}
      onMouseLeave={() => setIsHoverd(false)}>
      {hoverd ? (
        <div className="flex items-center gap-1 ">
          <IconButton
            className="p-1 px-2 transition border border-orange-300 rounded-full bg-black/70 hover:border-red-800 hover:scale-105"
            onClick={onEdit}
            icon={<SquarePen size={14} />}
          />
          <IconButton
            onClick={onDelete}
            icon={<Trash2 size={14} />}
            className="p-1 px-2 transition border border-orange-300 rounded-full bg-black/70 hover:border-red-800 hover:scale-105"
          />
        </div>
      ) : (
        <p>{item.name}</p>
      )}
      {/* {Category.name} */}
      <div className="absolute transition duration-500 opacity-0 top-full group-hover:opacity-100">
        <p className="p-1 px-2 mt-3 text-xs text-center text-white bg-black border border-red-300 rounded-full whitespace-nowrap w-fit bg-opacity-70">
          {item.category?.name}
        </p>
      </div>
    </div>
  );
}

export default SubcategoryItem;
