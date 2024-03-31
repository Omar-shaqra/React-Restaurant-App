import axios from "axios";
import { ImagePlus, Tag, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import SizeFields from "./size-fields";

const ProductForm = ({ categories, subcategories, isLoading, refetch }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [imageCover, setImageCover] = useState(null);

  const [price_basic, setPrice_basic] = useState("");
  const [price_md, setPrice_md] = useState("");
  const [price_lg, setPrice_lg] = useState("");

  const [sizes, setSizes] = useState("1");
  const [imagePreview, setImagePreview] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();

    if (categoryId === "") {
      toast.error("Select Category First");
    } else if (description.length < 19) {
      toast.error("Description is too short!");
    } else {
      const formdata = new FormData();
      formdata.append("imageCover", imageCover);
      formdata.append("title", title);
      formdata.append("description", description);
      formdata.append("category", categoryId);
      if (subcategoryId.length > 0) {
        formdata.append("subcategories", subcategoryId);
      }
      formdata.append("price.0.pr", price_basic);
      formdata.append("price.0.size", "basic");
      if (price_md) {
        formdata.append("price.1.pr", price_md);
        formdata.append("price.1.size", "md");
      }
      if (price_lg) {
        formdata.append("price.2.pr", price_lg);
        formdata.append("price.2.size", "lg");
      }
      try {
        await axios.post(
          `https://restaurant-menue-ordering-v1.onrender.com/api/v1/products`,
          formdata
        );
        refetch();
        setTitle("");
        setDescription("");
        setCategoryId("");
        setSubcategoryId("");
        setImageCover();
        setImagePreview();
        setSizes("1");
        setPrice_basic("");
        setPrice_md("");
        setPrice_lg("");
        toast.success("Product added successfully");
      } catch (error) {
        toast.error("Error occurred: " + error.message);
      }
    }
  };

  const categoriesOptions =
    categories &&
    categories.map((item, index) => (
      <option
        className="font-semibold text-center capitalize bg-black"
        key={categories[index]._id}
        value={categories[index]._id}>
        {categories[index].name}
      </option>
    ));

  const Subcategories_Options =
    subcategories &&
    subcategories
      .filter((subcategory) => subcategory.category._id === categoryId)
      .map((subcategory) => (
        <option
          className="font-semibold text-center capitalize bg-black"
          key={subcategory._id}
          value={subcategory._id}>
          {subcategory.name}
        </option>
      ));

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-center gap-4 mx-10 ml-auto mt-14">
      <h1 className="mr-auto font-extrabold tracking-wider">Add Product</h1>
      <div className="flex flex-row gap-6">
        {/* First Column (Category) */}
        <div className="flex flex-col gap-6">
          {/* Categories */}
          <select
            value={categoryId}
            onChange={(e) => {
              setCategoryId(e.target.value);
              setSubcategoryId(""); // Reset subcategory when category changes
            }}
            className="h-12 pl-3 text-base capitalize bg-black border border-red-300 rounded-lg focus:border-white bg-opacity-70">
            <option
              value=""
              disabled
              className="bg-neutral-400 text-neutral-800">
              Select Category
            </option>
            {categoriesOptions}
          </select>

          {/* Subcategories */}
          <select
            value={subcategoryId}
            onChange={(e) => setSubcategoryId(e.target.value)}
            className="h-12 pl-3 text-base capitalize bg-black border border-red-300 rounded-lg focus:border-white bg-opacity-70">
            <option
              value=""
              disabled
              className="bg-neutral-400 text-neutral-800">
              Select Sub-Category
            </option>
            {/* Only render subcategory options if available */}
            {Subcategories_Options?.length > 0 && Subcategories_Options}
          </select>

          {/* Title */}
          <div className="relative">
            <input
              required
              name="title"
              value={title}
              className="h-12 pl-3 text-base capitalize bg-black border border-red-300 rounded-lg focus:border-white bg-opacity-70"
              placeholder={"Enter Title..."}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="relative">
              <span className="absolute text-gray-300 right-4 bottom-3">
                <Tag />
              </span>
            </div>
          </div>
          {/* Description */}
          <textarea
            required
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Description..."
            className="pt-3 pl-3 m-0 text-base bg-black border border-red-300 rounded-lg min-h-12 max-h-12 focus:border-white bg-opacity-70"
          />
        </div>
        {/* Second Column (Sizes) */}
        <div className="flex flex-col items-center gap-y-6">
          <select
            required
            name="size"
            value={sizes}
            className="relative w-full h-12 pl-3 text-base bg-black border border-red-300 rounded-lg focus:border-white bg-opacity-70"
            onChange={(e) => setSizes(e.target.value)}>
            <option value="" disabled>
              Select Size
            </option>
            <option value="1">Size: basic</option>
            <option value="2">Sizes: basic, md</option>
            <option value="3">Sizes: basic, md, lg</option>
          </select>
          <SizeFields
            sizes={sizes}
            price_basic={price_basic}
            setPrice_basic={setPrice_basic}
            price_md={price_md}
            setPrice_md={setPrice_md}
            price_lg={price_lg}
            setPrice_lg={setPrice_lg}
          />
        </div>
        {/* Third Column (Image) */}
        <div className="flex flex-col items-center gap-6">
          {/* Image */}
          <div
            className="flex items-center justify-start px-2 text-base text-gray-300 bg-black border border-red-300 rounded-lg cursor-pointer min-h-12 max-h-fit text-clip focus:border-white hover:cursor-pointer bg-opacity-70 group"
            onClick={() => document.querySelector(".image").click()}>
            <input
              required
              type="file"
              accept="image/*"
              value={""}
              className="hidden image"
              disabled={imageCover}
              onChange={(e) => {
                setImageCover(e.target.files[0]);
                setImagePreview(URL.createObjectURL(e.target.files[0]));
              }}
            />
            {!imageCover ? (
              <span className="flex items-center justify-between w-full transition duration-300 image group-hover:text-green-300">
                <p>Upload Image</p>
                <ImagePlus />
              </span>
            ) : (
              <div className="flex items-center justify-between w-full gap-2 truncate max-w-52">
                <p className="items-start py-1 overflow-hidden text-blue-500 text-ellipsis">
                  {imageCover.name !== "" && imageCover.name}
                </p>
                <Trash2
                  key={imageCover ? imageCover.name : "empty"}
                  className="overflow-visible hover:text-red-400 "
                  onClick={() => {
                    setImageCover(null);
                    setImagePreview(null);
                  }}
                  size={20}
                />
              </div>
            )}
          </div>
          <img
            src={imagePreview ? imagePreview : "/No_Preview.png"}
            alt="imagePreview"
            className="flex h-48 rounded w-44"
          />
        </div>
      </div>
      {/* Submit button */}
      <button
        type="submit"
        disabled={isLoading || title === "" || description === ""}
        className="items-center justify-center w-3/6 h-10 p-1 my-5 text-lg text-white transition bg-black bg-opacity-75 rounded-lg hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-black">
        Create
      </button>
    </form>
  );
};
export default ProductForm;
