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
        className="capitalize text-lg p-2 m-2 bg-black text-center"
        key={index}
        value={categories[index]._id}>
        {categories[index].name}
      </option>
    ));

  return (
    <form
      onSubmit={onSubmit}
      className="mt-16 gap-4 flex flex-col ml-auto mx-16">
      <h1 className="font-extrabold tracking-wider">Add New Sub Category</h1>
      <input
        required
        className="text-base capitalize border w-full h-12 border-red-300 focus:border-white pl-3 bg-black bg-opacity-70 rounded-lg"
        placeholder={"Enter Sub Category Name"}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <h1 className="font-extrabold tracking-wider">Select Category</h1>
      <select
        onChange={(e) => setCategoryId(e.target.value)}
        className="text-base border w-full h-12 border-red-300 focus:border-white pl-3 bg-black bg-opacity-70 rounded-lg capitalize">
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
        className="self-center p-1 my-5 w-3/6 h-10 text-lg text-white bg-black bg-opacity-75 rounded-lg hover:bg-neutral-800 transition">
        Create
      </button>
    </form>
  );
};

export default SubcategoryForm;
