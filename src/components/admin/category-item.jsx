import { Trash2 } from "lucide-react";
import { useState } from "react";

function CategoryItem({ item, deleteItem, refetch }) {
  const [hoverd, setIsHoverd] = useState(false);

  return (
    <div
      className="relative flex items-center justify-center p-2 capitalize transition duration-300 rounded-full cursor-default bg-red-800/70 whitespace-nowrap hover:scale-110 group"
      key={item.id}
      onMouseEnter={() => setIsHoverd(true)}
      onMouseLeave={() => setIsHoverd(false)}>
      {hoverd ? (
        <button
          onClick={() =>
            deleteItem({ id: item._id, routeName: "categories" }).then(() => {
              refetch();
            })
          }
          className="px-1 py-[2px] text-center text-white transition border border-red-300 rounded-full whitespace-nowrap text-md bg-black/70 hover:border-red-800">
          <Trash2 size={16} />
        </button>
      ) : (
        <p>{item.name}</p>
      )}
    </div>
  );
}

export default CategoryItem;
