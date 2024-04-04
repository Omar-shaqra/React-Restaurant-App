import { Trash2 } from "lucide-react";
import { useState } from "react";

function SubcategoryItem({ item, deleteItem, refetch }) {
  const [hoverd, setIsHoverd] = useState(false);
  return (
    <div
      className="relative flex items-center justify-center p-2 capitalize transition duration-300 rounded-full cursor-default bg-red-800/70 whitespace-nowrap hover:scale-110 group"
      key={item.id}
      onMouseEnter={() => setIsHoverd(true)}
      onMouseLeave={() => setIsHoverd(false)}>
      {hoverd ? (
        <button
          type="button"
          autoFocus={false}
          onClick={() =>
            deleteItem({ id: item._id, routeName: "subcategories" }).then(
              () => {
                refetch();
              }
            )
          }
          className="p-1 text-center text-white transition border border-red-300 rounded-full whitespace-nowrap text-md bg-black/70 hover:border-red-800">
          <Trash2 size={15} />
        </button>
      ) : (
        <p>{item.name}</p>
      )}
      {/* {item.name} */}
      <div className="absolute transition duration-500 opacity-0 top-full group-hover:opacity-100">
        <p className="p-1 px-2 mt-3 text-xs text-center text-white bg-black border border-red-300 rounded-full whitespace-nowrap w-fit bg-opacity-70">
          {item.category?.name}
        </p>
      </div>
    </div>
  );
}

export default SubcategoryItem;
