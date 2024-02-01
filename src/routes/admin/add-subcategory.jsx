import axios from "axios";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import { GetCategories } from "../../actions/get-categories";
import { GetSubCategories } from "../../actions/get-subcategories";
import { deleteItem } from "../../actions/delete-item";

const AddSubcategory = () => {
  const [isMounted, setIsMounted] = useState(false);

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { isLoading, refetch } = GetSubCategories({
    setSubcategories: setSubcategories,
  });

  GetCategories({
    setCategories: setCategories,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    if (name.length <= 2) {
      toast.error("Name is too short");
      valid = false;
    } else if (categoryId === "") {
      toast.error("Select Category First!");
      valid = false;
    } else
      subcategories.data.forEach((subcategory) => {
        if (name === subcategory.name) {
          toast.error("Name Already Exists!");
          valid = false;
        }
      });

    if (valid == true) {
      try {
        await axios.post(
          "https://restaurant-menue-ordering-v1.onrender.com/api/v1/subcategories",

          {
            name,
            category: categoryId,
          }
        );
        refetch();
        setName("");
        toast.success("Subcategory Added Successfully.");
      } catch (error) {
        toast.error("Error occurred" + error.message);
      }
    }
  };

  const subCategoryList =
    subcategories.data &&
    subcategories.data.length > 0 &&
    Object.values(subcategories.data).map((item) => {
      return (
        <div
          className="flex justify-center items-center p-2 capitalize bg-red-800/70 rounded-full whitespace-nowrap transition cursor-default duration-300 hover:scale-110 hover:border hover:border-red-300 relative group"
          key={item.id}>
          {item.name}
          <div className="absolute top-full text-sm opacity-0 group-hover:opacity-100 transition duration-500">
            <p
              className="whitespace-nowrap rounded-full px-2 p-1 mt-3 text-white w-fit border border-red-300
          bg-black text-md text-center bg-opacity-70">
              {item.category.name}
            </p>
          </div>
          <div className="absolute top-full text-sm opacity-0 group-hover:opacity-100 transition duration-500">
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
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      );
    });

  const categoryOptions =
    categories.data &&
    Object.values(categories.data).map((item, index) => (
      <option
        className="capitalize text-lg p-2 m-2 bg-black text-center"
        key={index}
        value={categories.data[index]._id}>
        {categories.data[index].name}
      </option>
    ));

  if (!isMounted) {
    return null;
  }

  return (
    <div className="mx-5 my-5 text-2xl font-semibold flex flex-col gap-4 text-white">
      <h1 className="self-center font-extrabold tracking-wider">
        All Subcategories
      </h1>
      <div className="flex gap-6 p-3 justify-around bg-black bg-opacity-75 text-base rounded-md">
        {subCategoryList ? subCategoryList : <div>Loading...</div>}
      </div>
      {/* Add Form */}
      <div className="flex flex-col">
        <form
          onSubmit={onSubmit}
          className="mt-16 gap-4 flex flex-col ml-auto mx-16">
          <h1 className="font-extrabold tracking-wider">
            Add New Sub Category
          </h1>
          <input
            required
            className="text-lg capitalize border 2xl:w-[400px] lg:w-[300px] xl:h-12 h-10 border-red-300 focus:border-white pl-3 bg-black bg-opacity-70 rounded-lg"
            placeholder={"Enter Sub Category Name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <h1 className="font-extrabold tracking-wider">Select Category</h1>
          <select
            onChange={(e) => setCategoryId(e.target.value)}
            className="text-base border 2xl:w-[400px] lg:w-[300px] xl:h-12 h-10 border-red-300 focus:border-white pl-3 bg-black bg-opacity-70 rounded-lg capitalize">
            <option
              disabled
              selected
              className="capitalize bg-neutral-400 text-neutral-800">
              Select Category
            </option>
            {categoryOptions}
          </select>
          <button
            type="submit"
            disabled={isLoading}
            className="flex justify-center items-center p-1 my-5 2xl:w-[400px] lg:w-[300px] h-10 text-lg text-white bg-black bg-opacity-55 rounded-lg hover:bg-neutral-700 transition disabled:cursor-not-allowed disabled:bg-black">
            {/* {loading ? <LoadingSpinner size={'35'} /> : 'Create'} */}
            create
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSubcategory;
