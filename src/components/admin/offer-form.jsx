import axios from "axios";
import { DollarSign, ImagePlus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import Button from "../ui/button";

const OfferForm = ({ refetch, groups }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [GroupsID, setGroupsID] = useState([]);

  // Submit Form
  const onSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();

    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("image", image);
    formdata.append("price", price);
    GroupsID.forEach((group, index) => {
      formdata.append(`GroupsID[${index}][_id]`, group.id);
      formdata.append(`quantity[${index}]`, group.quantity);
    });

    try {
      await axios.post(
        `${import.meta.env.VITE_REACT_API_URL}/offers`,
        formdata
      );
      refetch();
      setName("");
      setPrice("");
      setImage(null);
      setGroupsID([]);
      setImagePreview(null);
      toast.success("Offer Added Successfully.");
    } catch (error) {
      toast.error("Error occurred: " + error.message);
    }
  };

  const addGroup = () => {
    setGroupsID((prevGroups) => [...prevGroups, { id: "", quantity: "1" }]);
  };

  const removeGroup = (index) => {
    const updatedGroups = [...GroupsID];
    updatedGroups.splice(index, 1);
    setGroupsID(updatedGroups);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 mx-16 mt-16 ml-auto">
      <h1 className="self-start font-extrabold tracking-wider">
        Add New Offer
      </h1>
      <div className="flex flex-row gap-6">
        {/* First Column */}
        <div className="flex flex-col items-center gap-5">
          {/* Name */}
          <input
            required
            className="w-40 input-field"
            placeholder="Enter Offer Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Price */}
          <div className="relative flex self-center gap-2">
            <input
              required
              type="number"
              min={1}
              step={0.01}
              value={price}
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
              className="w-40 input-field"
            />
            <DollarSign className="absolute text-gray-300 right-4 bottom-3" />
          </div>
        </div>

        {/* Second Column (Image) */}
        <div className="flex flex-col items-center gap-6">
          <div
            className="flex items-center justify-start px-2 text-base text-gray-300 bg-black border border-red-300 rounded-lg cursor-pointer min-h-12 max-h-fit text-clip focus:border-white hover:cursor-pointer bg-opacity-70 group"
            onClick={() => document.querySelector(".image").click()}>
            <input
              type="file"
              accept="image/*"
              className="hidden image"
              disabled={image}
              onChange={(e) => {
                setImage(e.target.files[0]);
                setImagePreview(URL.createObjectURL(e.target.files[0]));
              }}
              key={image ? image.name : "image-upload"} // Corrected: Keyed input to reset after image is set
            />
            {!image ? (
              <span className="flex items-center justify-between w-full gap-2 transition duration-300 image group-hover:text-green-300">
                <p>Upload Image</p>
                <ImagePlus />
              </span>
            ) : (
              <div className="flex items-center justify-between w-full gap-2 truncate max-w-40">
                <p className="items-start py-1 overflow-hidden text-sm text-blue-500 text-ellipsis">
                  {image.name}
                </p>
                <Trash2
                  className="overflow-visible hover:text-red-400"
                  onClick={() => {
                    setImage(null);
                    setImagePreview(null);
                  }}
                  size={20}
                />
              </div>
            )}
          </div>
          {/* Image Preview */}
          <img
            src={imagePreview || "/No_Preview.png"}
            alt="image preview"
            className="flex h-48 rounded w-44"
          />
          <Button text="Create" type="submit" />
        </div>

        {/* Third Coulmn */}
        <div className="flex flex-col w-40 gap-6">
          {/* Add Group Button */}
          <button
            onClick={addGroup}
            type="button"
            className="flex items-center self-center gap-2 p-1 bg-black border border-[#fca5a5] rounded-lg text-base hover:bg-gray-600 transition-colors duration-500">
            Add Group
            <Plus />
          </button>

          {/* Manually Added Inputs */}
          {GroupsID.map((group, index) => (
            <div key={index} className="flex items-center gap-1">
              {/* Select */}
              <select
                name={`group-products-${index}`}
                id={`group-products-${index}`}
                className="w-32 input-field"
                value={group.id}
                onChange={(e) => {
                  const newGroups = [...GroupsID];
                  newGroups[index].id = e.target.value;
                  setGroupsID(newGroups);
                }}>
                {/* Default option */}
                <option
                  value=""
                  disabled
                  className="bg-neutral-400 text-neutral-800">
                  Select group
                </option>
                {groups?.map((option, idx) => (
                  <option key={idx} value={option._id}>
                    {option.name}
                  </option>
                ))}
              </select>

              {/* Quantity Input */}
              <input
                required
                min={1}
                name={`Quantity-${index}`}
                type="number"
                value={group.quantity}
                placeholder="Qty"
                onChange={(e) => {
                  const newGroups = [...GroupsID];
                  newGroups[index].quantity = e.target.value;
                  setGroupsID(newGroups);
                }}
                className="w-14 input-field"
              />

              {/* Remove Button */}
              <button
                type="button"
                onClick={() => removeGroup(index)}
                className="p-1 text-base text-black transition-colors duration-300 bg-gray-200 rounded-full hover:text-white hover:bg-red-500">
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};

export default OfferForm;
