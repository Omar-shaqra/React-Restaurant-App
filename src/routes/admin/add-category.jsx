import axios from "axios";
import { Trash2, ImagePlus } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { deleteItem } from "../../actions/delete-item";
import { GetCategories } from "../../actions/get-categories";

const AddCategory = () => {
  const [isMounted, setIsMounted] = useState(false);

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { isLoading, refetch } = GetCategories({
    setCategories: setCategories,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();

    let valid = true;
    if (name.length <= 2) {
      toast.error("Name Is Too Short!");
      valid = false;
    } else
      categories.data.forEach((category) => {
        if (name === category.name) {
          toast.error("Name Already Exists!");
          valid = false;
        }
      });

    if (valid == true) {
      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("image", image);
      try {
        await axios.post(
          // "https://restaurant-menue-ordering-v1.onrender.com/api/v1/categories",
          "http://localhost:8000/api/v1/categories",

          formdata
        );
        refetch();
        setName("");
        toast.success("Category Added Successfully.");
      } catch (error) {
        toast.error("Error: " + error);
      }
    }
  };

  if (!isMounted) {
    return null;
  }

  const categoryList =
    categories.data &&
    categories.data.length > 0 &&
    categories.data.map((item) => {
      return (
        <div
          className="flex justify-center items-center p-2 capitalize bg-red-800/70 rounded-full whitespace-nowrap transition cursor-default duration-300 hover:scale-110 relative group"
          key={item.id}>
          {item.name}
          <div className="absolute top-full text-sm opacity-0 group-hover:opacity-100">
            <button
              onClick={() =>
                deleteItem({ id: item._id, routeName: "categories" }).then(
                  () => {
                    refetch();
                  }
                )
              }
              className="whitespace-nowrap rounded-full px-2 p-1 mt-3
              text-md text-center bg-black/70 text-white border border-red-300 transition hover:border-red-800 hover:border-2">
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      );
    });

  return (
    <section className="mx-5 my-5 text-2xl font-semibold flex flex-col gap-4 text-white">
      <h1 className="self-center font-extrabold tracking-wider">
        All Categories
      </h1>
      <div className="flex gap-6 p-3 justify-around bg-black bg-opacity-75 text-base border-t-[#d46622] border-t rounded-md">
        {categoryList ? categoryList : <div>Loading...</div>}
      </div>
      {/* Add Form */}
      <form
        onSubmit={onSubmit}
        className="mt-14 gap-4 flex flex-col ml-auto mx-16">
        <h1 className="font-extrabold tracking-wider">Add New Category</h1>
        <div className="flex flex-col gap-y-3 items-center">
          <input
            required
            className="text-base capitalize border w-full xl:h-12 h-10  border-red-300 focus:border-white pl-3 bg-black bg-opacity-70 rounded-lg"
            placeholder={"Enter Category Name"}
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div
            className="flex items-center justify-start px-2 border-red-300 cursor-pointer text-base text-gray-300 border  min-h-12 max-h-fit text-clip focus:border-white hover:cursor-pointer bg-black bg-opacity-70 rounded-lg group"
            onClick={() => document.querySelector(".image").click()}>
            <input
              required
              type="file"
              accept="image/*"
              value={""}
              className="image hidden"
              disabled={image}
              onChange={(e) => setImage(e.target.files[0])}
            />
            {!image ? (
              <span className="image flex justify-between items-center w-full group-hover:text-green-300 transition duration-300">
                <p>Upload Image</p>
                <ImagePlus />
              </span>
            ) : (
              <div className="flex gap-2 justify-between items-center w-full max-w-52 truncate ">
                <p className="py-1 items-start overflow-hidden text-ellipsis text-blue-500">
                  {image.name !== "" && image.name}
                </p>
                <Trash2
                  key={image ? image.name : "empty"}
                  className="hover:text-red-400 overflow-visible "
                  onClick={() => {
                    setImage(null);
                  }}
                  size={20}
                />
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className=" items-center p-1 my-5 w-3/6 h-10 text-lg text-white bg-black bg-opacity-75 rounded-lg hover:bg-neutral-800 transition disabled:cursor-not-allowed disabled:bg-black">
            Create
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddCategory;
