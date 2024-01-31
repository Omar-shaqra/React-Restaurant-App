import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const AddSubcategory = () => {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    getSubcategories();
    getCategories();
  }, []);

  const getSubcategories = async () => {
    const { data } = await axios.get(
      `https://restaurant-menue-ordering-v1.onrender.com/api/v1/subcategories`
    );
    setSubcategories(data);
  };

  const getCategories = async () => {
    const { data } = await axios.get(
      `https://restaurant-menue-ordering-v1.onrender.com/api/v1/categories`
    );
    setCategories(data);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (categoryId === "") {
      toast.error("select category first");
    } else {
      setLoading(true);
      try {
        await axios.post(
          `https://restaurant-menue-ordering-v1.onrender.com/api/v1/subcategories`,

          {
            name,
            category: categoryId,
          }
        );
        toast.success("Subcategory added successfully");
        setLoading(false);
      } catch (error) {
        toast.error("Error occurred" + error.message);
      } finally {
        setLoading(false);
        getCategories();
        getSubcategories();
      }
    }
  };

  const deleteItem = async (id) => {
    const isConfirm = await Swal.fire({
      title: "Sure to Delete?",
      text: "You won't be able to undo this operation",
      icon: "warning",
      showCancelButton: true,
      background: "#292927",
      color: "#fff",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "yes, Delete",
    }).then((result) => {
      return result.isConfirmed;
    });

    if (!isConfirm) {
      return;
    }
    await axios
      .delete(
        `https://restaurant-menue-ordering-v1.onrender.com/api/v1/subcategories/${id}`
      )
      .then(() => {
        Swal.fire({
          title: "Deleted Successfully",
          icon: "success",
          background: "#292927",
          color: "#fff",
        });
        getCategories();
        getSubcategories();
      })
      .catch(({ response: { data } }) => {
        Swal.fire({
          text: "Error :" + data.message,
          icon: "error",
        });
      });
  };

  const subCategoryList =
    subcategories.data &&
    subcategories.data.length > 0 &&
    Object.values(subcategories.data).map((item) => {
      return (
        <div
          className="flex justify-center items-center p-2 capitalize bg-red-800/70 rounded-full whitespace-nowrap transition cursor-default duration-300 hover:scale-110 relative group"
          key={item.id}>
          {item.name}
          <div className="absolute top-full text-sm opacity-0 group-hover:opacity-100">
            <button
              onClick={() => deleteItem(item._id)}
              className="whitespace-nowrap rounded-full px-2 p-1 mt-3
          bg-red-100 text-black text-md text-center
          ">
              Delete
            </button>
          </div>
        </div>
      );
    });

  const categoriesOptions =
    categories.data &&
    Object.values(categories.data).map((item, index) => (
      <option
        className="capitalize p-2 m-2 bg-black text-center"
        key={index}
        value={categories.data[index]._id}>
        {categories.data[index].name}
      </option>
    ));

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
          className="mt-14 gap-4 flex flex-col ml-auto mx-16">
          <h1 className="font-extrabold tracking-wider">
            Add New Sub Category
          </h1>
          <input
            required
            className="text-base  border 2xl:w-[400px] lg:w-[300px] xl:h-12 h-10 border-red-300 focus:border-white pl-3 bg-black bg-opacity-70 rounded-lg"
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
            {categoriesOptions}
          </select>
          <button
            type="submit"
            disabled={loading}
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
