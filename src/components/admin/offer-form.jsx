import axios from "axios";
import { DollarSign, ImagePlus, Trash2 } from "lucide-react";
import { Multiselect } from "multiselect-react-dropdown";
import { useState } from "react";
import toast from "react-hot-toast";
import Button from "../ui/button";

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
          `${import.meta.env.VITE_REACT_API_URL}/offers`,
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
      className="flex flex-col gap-4 mx-16 mt-16 ml-auto">
      <h1 className="self-end font-extrabold tracking-wider">Add New Offer</h1>
      <div className="flex flex-row gap-6">
        {/* First Column */}
        <div className="flex flex-col items-center gap-5">
          {/* Name */}
          <input
            required
            className="h-12 pl-3 text-base capitalize bg-black border border-red-300 rounded-lg w-fit focus:border-white bg-opacity-70"
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
            className="pt-2 text-base text-black capitalize bg-black border border-red-300 rounded-lg w-fit focus:border-white bg-opacity-70"
          />

          {/* Price */}
          <div className="relative flex self-end gap-2">
            <input
              required
              type="number"
              min={1}
              step={0.01}
              value={price}
              placeholder="Enter Price..."
              onChange={(e) => setPrice(e.target.value)}
              className="h-12 pl-3 text-base bg-black border border-red-300 rounded-lg w-fit focus:border-white bg-opacity-70"
            />
            <DollarSign className="absolute text-gray-300 right-4 bottom-3" />
          </div>
          <Button text={"Create"} type={"submit"} />
        </div>

        {/* Second Column (Image) */}
        <div className="flex flex-col items-center gap-6">
          <div
            className="flex items-center justify-start px-2 text-base text-gray-300 bg-black border border-red-300 rounded-lg cursor-pointer min-h-12 max-h-fit text-clip focus:border-white hover:cursor-pointer bg-opacity-70 group"
            onClick={() => document.querySelector(".image").click()}>
            <input
              type="file"
              accept="image/*"
              value={""}
              className="hidden image"
              disabled={image}
              onChange={(e) => {
                setImage(e.target.files[0]);
                setImagePreview(URL.createObjectURL(e.target.files[0]));
              }}
            />
            {!image ? (
              <span className="flex items-center justify-between w-full gap-2 transition duration-300 image group-hover:text-green-300">
                <p>Upload Image</p>
                <ImagePlus />
              </span>
            ) : (
              <div className="flex items-center justify-between w-full gap-2 truncate max-w-52">
                <p className="items-start py-1 overflow-hidden text-blue-500 text-ellipsis">
                  {image.name !== "" && image.name}
                </p>
                <Trash2
                  key={image?.name}
                  className="overflow-visible hover:text-red-400 "
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
            src={imagePreview ? imagePreview : "/No_Preview.png"}
            alt="image preview"
            className="flex h-48 rounded w-44"
          />
        </div>
      </div>
    </form>
  );
};

export default OfferForm;
