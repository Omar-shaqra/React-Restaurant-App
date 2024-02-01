import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

import { GetCategories } from "../../actions/get-categories";
import { deleteItem } from "../../actions/delete-item";

const AddCategory = () => {
  const [isMounted, setIsMounted] = useState(false);

  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { isLoading, refetch } = GetCategories({
    setCategories: setCategories,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
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
      try {
        await axios.post(
          "https://restaurant-menue-ordering-v1.onrender.com/api/v1/categories",
          {
            name,
          }
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
    Object.values(categories.data).map((item) => {
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
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      );
    });

  return (
    <div className="mx-5 my-5 text-2xl font-semibold flex flex-col gap-4 text-white">
      <h1 className="self-center font-extrabold tracking-wider">
        All Categories
      </h1>
      <div className="flex gap-6 p-3 justify-around bg-black bg-opacity-75 text-base rounded-md">
        {categoryList ? categoryList : <div>Loading...</div>}
      </div>
      {/* Add Form */}
      <form
        onSubmit={onSubmit}
        className="mt-14 gap-4 flex flex-col ml-auto mx-16">
        <h1 className="font-extrabold tracking-wider">Add New Category</h1>
        <div>
          <input
            required
            className="text-lg capitalize border 2xl:w-[400px] lg:w-[300px] xl:h-12 h-10  border-red-300 focus:border-white pl-3 bg-black bg-opacity-70 rounded-lg"
            placeholder={"Enter Category Name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="flex justify-center items-center p-1 my-5 2xl:w-[400px] lg:w-[300px] h-10 text-lg text-white bg-black bg-opacity-55 rounded-lg hover:bg-neutral-700 transition disabled:cursor-not-allowed disabled:bg-black">
            create
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
