import { Trash2 } from "lucide-react";
import { deleteItem } from "../../actions/delete-item";

function OfferItem({ item, refetch }) {
  return (
    <div
      className="relative flex items-center justify-center p-2 capitalize transition duration-300 rounded-full cursor-default bg-red-800/70 whitespace-nowrap hover:scale-110 group"
      key={item.id}>
      {item.name}
      <div className="absolute text-sm opacity-0 top-full group-hover:opacity-100">
        <button
          onClick={() =>
            deleteItem({ id: item._id, routeName: "offers" }).then(() => {
              refetch();
            })
          }
          className="p-1 px-2 mt-3 text-center text-white transition border border-red-300 rounded-full whitespace-nowrap text-md bg-black/70 hover:border-red-800 hover:border-2">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

export default OfferItem;
