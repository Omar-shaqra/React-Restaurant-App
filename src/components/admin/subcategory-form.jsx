import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const SubcategoryForm = ({ categories, subcategories, refetch }) => {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();

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
          // "https://restaurant-menue-ordering-v1.onrender.com/api/v1/subcategories",
          "http://localhost:8000/api/v1/subcategories",
          {
            name,
            category: categoryId,
          }
        );
        refetch();
        setName("");
        setCategoryId("");

        toast.success("Subcategory Added Successfully.");
      } catch (error) {
        toast.error("Error occurred" + error.message);
      }
    }
  };

  const categoryOptions =
    categories &&
    categories.map((item, index) => (
      <option
        className="p-2 m-2 text-lg text-center capitalize bg-black"
        key={index}
        value={categories[index]._id}>
        {categories[index].name}
      </option>
    ));

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 mx-16 mt-16 ml-auto">
      <h1 className="font-extrabold tracking-wider">Add New Sub Category</h1>
      <input
        required
        className="w-full h-12 pl-3 text-base capitalize bg-black border border-red-300 rounded-lg focus:border-white bg-opacity-70"
        placeholder={"Enter Sub Category Name"}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <h1 className="font-extrabold tracking-wider">Select Category</h1>
      <select
        onChange={(e) => setCategoryId(e.target.value)}
        className="w-full h-12 pl-3 text-base capitalize bg-black border border-red-300 rounded-lg focus:border-white bg-opacity-70">
        {categoryId === "" && ( // Add this condition to show "Select Category" by default
          <option
            disabled
            selected
            className="capitalize bg-neutral-400 text-neutral-800">
            Select Category
          </option>
        )}
        {categoryOptions}
      </select>
      <button
        type="submit"
        className="self-center w-3/6 h-10 p-1 my-5 text-lg text-white transition bg-black bg-opacity-75 rounded-lg hover:bg-neutral-800">
        Create
      </button>
    </form>
  );
};

export default SubcategoryForm;
