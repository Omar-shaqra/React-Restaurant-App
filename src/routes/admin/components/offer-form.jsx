import axios from "axios";
import { DollarSign, ImagePlus, Trash2 } from "lucide-react";
import { Multiselect } from "multiselect-react-dropdown";
import { useState } from "react";
import toast from "react-hot-toast";

import noImage from "../../../assets/No_Preview.png";

const OfferForm = ({ products, refetch }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [productId, setProductId] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();

    let valid = true;
    if (name.length <= 2) {
      toast.error("Name is too short");
      valid = false;
    } else if (productId === "") {
      toast.error("Select Products First!");
      valid = false;
    }

    if (valid == true) {
      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("image", image);
      formdata.append("price", price);
      productId.map((product, index) => {
        formdata.append(`productsID[${index}]`, product.id);
      });
      try {
        await axios.post(
          // "https://restaurant-menue-ordering-v1.onrender.com/api/v1/subcategories",
          `http://localhost:8000/api/v1/offers`,
          formdata
        );
        refetch();
        setName("");
        setPrice("");
        setProductId();
        setImage();
        setImagePreview();
        toast.success("Offer Added Successfully.");
      } catch (error) {
        toast.error("Error occurred" + error.message);
      }
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mt-16 gap-4 flex flex-col ml-auto mx-16">
      <h1 className="font-extrabold self-end tracking-wider">Add New Offer</h1>
      <div className="flex flex-row gap-6">
        {/* First Column */}
        <div className="flex flex-col items-end gap-6">
          {/* Name */}
          <input
            required
            className="text-base capitalize border w-fit h-12 border-red-300 focus:border-white pl-3 bg-black bg-opacity-70 rounded-lg"
            placeholder={"Enter Offer Name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Products */}
          <Multiselect
            onSelect={(selectedList) => {
              setProductId(selectedList);
            }}
            options={products}
            displayValue={"title"}
            closeOnSelect={false}
            hidePlaceholder
            // isObject
            style={{
              chips: {
                backgroundColor: "#d84e03",
                fontSize: "14px",
              },
              searchBox: {
                color: "white",
                border: "none",
                height: "48px",
              },
            }}
            placeholder="Select Products"
            showArrow
            className="text-base capitalize pt-2 w-fit border border-red-300 focus:border-white text-black bg-black bg-opacity-70 rounded-lg"
          />

          {/* Price */}
          <div className="relative self-end flex gap-2">
            <input
              required
              type="number"
              min={1}
              step={0.01}
              value={price}
              placeholder="Enter Price..."
              onChange={(e) => setPrice(e.target.value)}
              className="text-base border w-fit h-12 border-red-300 focus:border-white pl-3 bg-black bg-opacity-70 rounded-lg"
            />
            <DollarSign className="absolute right-4 bottom-3 text-gray-300" />
          </div>
        </div>

        {/* Second Column (Image) */}
        <div className="flex flex-col gap-6 items-center">
          <div
            className="flex items-center justify-start px-2 border-red-300 cursor-pointer text-base text-gray-300 border min-h-12 max-h-fit text-clip focus:border-white hover:cursor-pointer bg-black bg-opacity-70 rounded-lg group"
            onClick={() => document.querySelector(".image").click()}>
            <input
              type="file"
              accept="image/*"
              value={""}
              className="image hidden"
              disabled={image}
              onChange={(e) => {
                setImage(e.target.files[0]);
                console.log(image);
                setImagePreview(URL.createObjectURL(e.target.files[0]));
              }}
            />
            {!image ? (
              <span className="image flex justify-between items-center w-full group-hover:text-green-300 transition duration-300">
                <p>Upload Image</p>
                <ImagePlus />
              </span>
            ) : (
              <div className="flex gap-2 justify-between items-center w-full max-w-52 truncate">
                <p className="py-1 items-start overflow-hidden text-ellipsis text-blue-500">
                  {image.name !== "" && image.name}
                </p>
                <Trash2
                  key={image?.name}
                  className="hover:text-red-400 overflow-visible "
                  onClick={() => {
                    setImage(null);
                    setImagePreview(null);
                  }}
                  size={20}
                />
              </div>
            )}
          </div>
          <img
            src={imagePreview ? imagePreview : noImage}
            alt=""
            className="h-48 w-44 flex rounded"
          />
        </div>
      </div>

      <button
        type="submit"
        className="self-center p-1 my-5 w-3/6 h-10 text-lg text-white bg-black bg-opacity-75 rounded-lg hover:bg-neutral-800 transition">
        Create
      </button>
    </form>
  );
};

export default OfferForm;
