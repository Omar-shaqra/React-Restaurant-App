import axios from "axios";
import { ChevronDown } from "lucide-react";
import { Multiselect } from "multiselect-react-dropdown";
import { useState } from "react";
import toast from "react-hot-toast";

import Button from "../ui/button";
import Modal from "./modal";

const AddGroupModal = ({ isOpen, onClose, refetch, products }) => {
  const [name, setName] = useState("");
  const [scale, setScale] = useState("Basic");
  const [productsId, setProductsId] = useState([]);

  const sizes = ["Basic", "Medium", "Large"];

  const onSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();

    const formdata = new FormData();
    productsId.map((product, index) => {
      formdata.append(`products[${index}]`, product.id);
    });

    try {
      await axios.post(`${import.meta.env.VITE_REACT_API_URL}/group`, {
        name,
        scale,
        products: productsId.map((product) => product._id),
      });
      refetch();
      onClose();
      setName("");
      setScale("Basic");
      setProductsId([]);
      toast.success("Group Added Successfully.");
    } catch (error) {
      toast.error("Error occurred" + error.message);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose} bgColor={"bg-black"}>
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-start gap-5 p-5 text-white min-w-[500px]">
        <h1 className="self-start text-2xl font-extrabold tracking-wider">
          New Group
        </h1>
        <div className="flex flex-col w-full gap-5">
          <div className="flex items-center justify-between w-full gap-3">
            {/* Name */}
            <input
              required
              value={name}
              className="input-field"
              placeholder="Group Name"
              onChange={(e) => setName(e.target.value)}
            />
            {/* Sizes */}
            <label htmlFor="scale">Select Size</label>
            <select
              name="scale"
              id="scale-select"
              className="input-field"
              onChange={(e) => setScale(e.target.value)}>
              {sizes.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <Button text="Create Group" type="submit" />
          </div>

          {/* Multi Select */}
          <div className="relative z-10 flex flex-col w-full gap-5 cursor-pointer">
            <Multiselect
              onSelect={(selectedList) => {
                setProductsId(selectedList);
              }}
              options={products}
              displayValue={"title"}
              closeOnSelect={false}
              hidePlaceholder
              isObject
              showCheckbox
              keepSearchTerm
              style={{
                chips: {
                  backgroundColor: "#d84e03",
                  fontSize: "14px",
                },
                searchBox: {
                  color: "white",
                  border: "none",
                },
              }}
              placeholder="Select Products"
              className="w-full text-base text-black capitalize bg-black border border-red-300 rounded-lg content-cente h-fit"
            />
            <ChevronDown className="absolute -translate-y-1/2 right-2 top-1/2" />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddGroupModal;
