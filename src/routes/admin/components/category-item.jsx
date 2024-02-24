import { Trash2 } from "lucide-react";

function CategoryItem({ item, deleteItem, refetch }) {
  return (
    <div
      className="flex justify-center items-center p-2 capitalize bg-red-800/70 rounded-full whitespace-nowrap transition cursor-default duration-300 hover:scale-110 relative group"
      key={item.id}>
      {item.name}
      <div className="absolute top-full text-sm opacity-0 group-hover:opacity-100">
        <button
          onClick={() =>
            deleteItem({ id: item._id, routeName: "categories" }).then(() => {
              refetch();
            })
          }
          className="whitespace-nowrap rounded-full px-2 p-1 mt-3
                  text-md text-center bg-black/70 text-white border border-red-300 transition hover:border-red-800 hover:border-2">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

export default CategoryItem;
