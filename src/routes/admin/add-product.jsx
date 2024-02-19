import axios from "axios";
import { DollarSign, ImagePlus, Tag, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { GetCategories } from "../../actions/get-categories";
import { GetSubCategories } from "../../actions/get-subcategories";
import { GetProducts } from "../../actions/get-products";
import ProductCard from "../../components/ui/product-card";
import noImage from "../../assets/No_Preview.png";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 3500, min: 2000 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 2000, min: 1524 },
    items: 5,
  },
  smallDesktop: {
    breakpoint: { max: 1524, min: 1024 },
    items: 4,
  },

  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const AddProduct = () => {
  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [imageCover, setImageCover] = useState(null);

  const [price_sm, setPrice_sm] = useState("");
  const [price_md, setPrice_md] = useState("");
  const [price_lg, setPrice_lg] = useState("");

  const size_basic = "basic";
  const size_md = "md";
  const size_lg = "lg";

  const [sizes, setSizes] = useState("1");
  const [imagePreview, setImagePreview] = useState();
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);

  GetSubCategories({
    setSubcategories: setSubCategories,
  });

  const { isLoading } = GetCategories({
    setCategories: setCategories,
  });

  const { refetch } = GetProducts({ setProducts: setProducts });

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
      formdata.append("price.0.pr", price_sm);
      formdata.append("price.0.size", size_basic);
      if (price_md) {
        formdata.append("price.1.pr", price_md);
        formdata.append("price.1.size", size_md);
      }
      if (price_lg) {
        formdata.append("price.2.pr", price_lg);
        formdata.append("price.2.size", size_lg);
      }

      formdata.append("description", description);
      formdata.append("category", categoryId);
      // formdata.append("subcategories", subcategoryId);
      try {
        await axios.post(
          // `https://restaurant-menue-ordering-v1.onrender.com/api/v1/products`,
          `http://localhost:8000/api/v1/products`,
          formdata
        );
        toast.success("Product added successfully");
        refetch();
        setTitle("");
        setPrice_sm("");
        setPrice_md("");
        setPrice_lg("");
        setDescription("");
        setImageCover(null);
      } catch (error) {
        toast.error("Error occurred: " + error.message);
      }
    }
  };

  const handleSizeChange = (e) => {
    setSizes(e.target.value);
  };

  const productList = products.data && products.data.length > 0 && (
    <Carousel
      className="border-t-[#d46622] border-t rounded-md "
      slidesToSlide={3}
      swipeable={false}
      minimumTouchDrag={80}
      keyBoardControl={true}
      arrows
      responsive={responsive}>
      {products.data.map((product, index) => (
        <ProductCard
          key={index}
          {...product}
          image="hidden"
          button="delete"
          refetch={refetch}
        />
      ))}
    </Carousel>
  );

  const renderSizeFields = () => {
    if (sizes === "1") {
      return (
        <div className="relative flex gap-2">
          <input
            required
            name="price"
            value={price_sm}
            className="text-base border w-full h-12 border-red-300 focus:border-white pl-3 bg-black bg-opacity-70 rounded-lg"
            placeholder={"Price for basic..."}
            type="number"
            min={1}
            onChange={(e) => setPrice_sm(e.target.value)}
          />
          <span className="absolute right-4 bottom-3 text-gray-300">
            <DollarSign />
          </span>
        </div>
      );
    } else if (sizes === "2") {
      return (
        <div className="flex flex-col gap-6">
          {/* Price sm */}
          <div className="relative flex gap-2">
            <input
              required
              name="price"
              value={price_sm}
              className="text-base border w-full h-12 border-red-300 focus:border-white pl-3 bg-black bg-opacity-70 rounded-lg"
              placeholder={"Price for basic..."}
              type="number"
              min={1}
              onChange={(e) => setPrice_sm(e.target.value)}
            />
            <span className="absolute right-4 bottom-3 text-gray-300">
              <DollarSign />
            </span>
          </div>
          {/* Price md */}
          <div className="relative flex gap-2">
            <input
              required
              name="price"
              value={price_md}
              className="text-base border w-full h-12 border-red-300 focus:border-white pl-3 bg-black bg-opacity-70 rounded-lg"
              placeholder={"Price for medium..."}
              type="number"
              min={1}
              onChange={(e) => setPrice_md(e.target.value)}
            />
            <span className="absolute right-4 bottom-3 text-gray-300">
              <DollarSign />
            </span>
          </div>
        </div>
      );
    } else if (sizes === "3") {
      return (
        <div className="flex flex-col gap-6">
          {/* Price sm */}
          <div className="relative  flex gap-2">
            <input
              required
              name="price"
              value={price_sm}
              className="text-base border w-full h-12 border-red-300 focus:border-white pl-3 bg-black bg-opacity-70 rounded-lg"
              placeholder={"Price for basic..."}
              type="number"
              min={1}
              onChange={(e) => setPrice_sm(e.target.value)}
            />
            <span className="absolute right-4 bottom-3 text-gray-300">
              <DollarSign />
            </span>
          </div>
          {/* Price md */}
          <div className="relative flex gap-2">
            <input
              required
              name="price"
              value={price_md}
              className="text-base border w-full h-12 border-red-300 focus:border-white pl-3 bg-black bg-opacity-70 rounded-lg"
              placeholder={"Price for medium..."}
              type="number"
              min={1}
              onChange={(e) => setPrice_md(e.target.value)}
            />
            <span className="absolute right-4 bottom-3 text-gray-300">
              <DollarSign />
            </span>
          </div>
          {/* Price */}
          <div className="relative  flex gap-2">
            <input
              required
              name="price"
              value={price_lg}
              className="text-base border w-full h-12 border-red-300 focus:border-white pl-3 bg-black bg-opacity-70 rounded-lg"
              placeholder={"Price for large..."}
              type="number"
              min={1}
              onChange={(e) => setPrice_lg(e.target.value)}
            />
            <span className="absolute right-4 bottom-3 text-gray-300">
              <DollarSign />
            </span>
          </div>
        </div>
      );
    }
  };

  const categoriesOptions =
    categories.data &&
    categories.data.map((item, index) => (
      <option
        className="capitalize bg-black text-center font-semibold"
        key={categories.data[index]._id}
        value={categories.data[index]._id}>
        {categories.data[index].name}
      </option>
    ));

  const Subcategories_Options =
    subcategories.data &&
    subcategories.data.map((item, index) => (
      <option
        className="capitalize bg-black text-center font-semibold"
        key={subcategories.data[index]._id}
        value={subcategories.data[index]._id}>
        {subcategories.data[index].name}
      </option>
    ));

  return (
    <section className="flex flex-col items-center px-4 gap-4 my-5 text-2xl font-semibold text-white">
      {/* Products */}
      <h1 className="self-center font-extrabold tracking-wider">
        All Products
      </h1>
      <div className="my-6 bg-[#000000] bg-opacity-70 container">
        {productList ? (
          productList
        ) : (
          <div className="self-center flex justify-center items-center text-base py-2">
            Loading...
          </div>
        )}
      </div>
      {/* Products */}

      {/* Form */}
      <form
        onSubmit={onSubmit}
        className="mt-14 gap-4 flex flex-col ml-auto mx-10 items-center">
        <h1 className="font-extrabold tracking-wider mr-auto">Add Product</h1>
        <div className="flex flex-row gap-6">
          {/* First Column (Category) */}
          <div className="flex flex-col gap-6">
            {/* Categories */}
            <select
              onChange={(e) => setCategoryId(e.target.value)}
              className="text-base border h-12 border-red-300 focus:border-white pl-3 bg-black bg-opacity-70 rounded-lg capitalize">
              <option
                // disabled
                value={null}
                selected
                className="bg-neutral-400 text-neutral-800">
                Select Category
              </option>
              {categoriesOptions}
            </select>
            {/* Subcategories */}
            <select
              onChange={(e) => setSubcategoryId(e.target.value)}
              className="text-base border  h-12 border-red-300 focus:border-white pl-3 bg-black bg-opacity-70 rounded-lg capitalize">
              <option
                // disabled
                value={""}
                selected
                className="bg-neutral-400 text-neutral-800">
                Select Sub-Category
              </option>
              {Subcategories_Options}
            </select>
            {/* Title */}
            <div className="relative">
              <input
                required
                name="title"
                value={title}
                className="text-base border capitalize h-12 border-red-300 focus:border-white pl-3 bg-black bg-opacity-70 rounded-lg"
                placeholder={"Enter Title..."}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="relative">
                <span className="absolute right-4 bottom-3 text-gray-300">
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
              className="text-base border  min-h-12 max-h-12 border-red-300 focus:border-white m-0 pl-3 pt-3 bg-black bg-opacity-70 rounded-lg"
            />
          </div>
          {/* Second Column (Sizes) */}
          <div className="flex flex-col gap-y-6 items-center">
            <select
              required
              name="size"
              value={sizes}
              className=" relative text-base w-full border h-12 border-red-300 focus:border-white pl-3 bg-black bg-opacity-70 rounded-lg"
              onChange={handleSizeChange}>
              <option value="" disabled>
                Select Size
              </option>
              <option value="1">Size, basic</option>
              <option value="2">Size basic, md</option>
              <option value="3">Size basic, md, lg</option>
            </select>
            {renderSizeFields()}
          </div>
          {/* Third Column (Image) */}
          <div className="flex flex-col gap-6">
            {/* Image */}
            <div
              className="flex items-center justify-start px-2 border-red-300 cursor-pointer text-base text-gray-300 border min-h-12 max-h-fit text-clip focus:border-white hover:cursor-pointer bg-black bg-opacity-70 rounded-lg group"
              onClick={() => document.querySelector(".image").click()}>
              <input
                required
                type="file"
                accept="image/*"
                value={""}
                className="image hidden"
                disabled={imageCover}
                onChange={(e) => {
                  setImageCover(e.target.files[0]);
                  setImagePreview(URL.createObjectURL(e.target.files[0]));
                }}
              />
              {!imageCover ? (
                <span className="image flex justify-between items-center w-full group-hover:text-green-300 transition duration-300">
                  <p>Upload Image</p>
                  <ImagePlus />
                </span>
              ) : (
                <div className="flex gap-2 justify-between items-center w-full max-w-52 truncate">
                  <p className="py-1 items-start overflow-hidden text-ellipsis text-blue-500">
                    {imageCover.name !== "" && imageCover.name}
                  </p>
                  <Trash2
                    key={imageCover ? imageCover.name : "empty"}
                    className="hover:text-red-400 overflow-visible "
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
              src={imagePreview ? imagePreview : noImage}
              alt=""
              className="h-48 w-44 flex rounded"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="justify-center items-center p-1 my-5 w-3/6 h-10 text-lg text-white bg-black bg-opacity-75 rounded-lg hover:bg-neutral-800 transition disabled:cursor-not-allowed disabled:bg-black">
          Create
        </button>
      </form>
    </section>
  );
};

export default AddProduct;
