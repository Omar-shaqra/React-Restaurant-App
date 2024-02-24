import { Trash2 } from "lucide-react";

function SubcategoryItem({ item, deleteItem, refetch }) {
  return (
    <div
      className="flex justify-center items-center p-2 capitalize bg-red-800/70 rounded-full whitespace-nowrap transition cursor-default duration-300 hover:scale-110 relative group"
      key={item.id}>
      {item.name}
      <div className="absolute top-full opacity-0 group-hover:opacity-100 transition duration-500">
        <p
          className="whitespace-nowrap rounded-full px-2 text-xs p-1 mt-3 text-white w-fit border border-red-300
          bg-black text-center bg-opacity-70">
          {item.category?.name}
        </p>
      </div>
      <div className="absolute top-full opacity-0 group-hover:opacity-100 transition duration-500">
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
          className="whitespace-nowrap rounded-full px-2 p-1 mt-12
           text-md text-center bg-black/70 text-white border border-red-300 transition hover:border-red-800 hover:border-2">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

export default SubcategoryItem;
