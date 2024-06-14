import { ChevronDown, Trash2 } from "lucide-react";
import { useState } from "react";
import Modal from "./modal";
import { deleteItem } from "../../actions/delete-item";

const ViewGroupsModal = ({ isOpen, onClose, refetch, groups }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (groupId) => {
    setOpenDropdown((prev) => (prev === groupId ? null : groupId));
  };

  const deleteGroup = (id) => {
    deleteItem({ id, routeName: "group" }).then(() => {
      refetch();
    });
  };

  return (
    <Modal open={isOpen} onClose={onClose} bgColor={"bg-black"}>
      <div className="flex flex-col items-start gap-5 p-5 text-white min-w-[500px]">
        <h1 className="self-start text-2xl font-extrabold tracking-wider">
          All Groups
        </h1>
        <div className="flex flex-col w-full gap-5">
          {groups?.map((group) => (
            <div key={group._id} className="w-full ">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => toggleDropdown(group._id)}
                  className="flex justify-between w-full px-4 py-2 text-left bg-gray-800 rounded">
                  {group.name}
                  {group.scale && (
                    <p className="px-1 bg-gray-600 rounded">{group.scale}</p>
                  )}
                  <ChevronDown />
                </button>
                <Trash2
                  onClick={() => deleteGroup(group._id)}
                  size={28}
                  className="p-1 text-black transition-colors duration-300 bg-white rounded-full cursor-pointer hover:bg-red-400"
                />
              </div>

              {openDropdown === group._id && (
                <div className="mt-2 ml-4">
                  {group.products?.map((product) => (
                    <div className="flex items-center gap-2" key={product.id}>
                      <p
                        key={product.id}
                        className="w-[90%] px-4 py-2 mt-px text-white bg-gray-700 rounded">
                        {product.title}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ViewGroupsModal;
