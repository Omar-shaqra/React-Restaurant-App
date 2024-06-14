import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "../ui/button";

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
          `${import.meta.env.VITE_REACT_API_URL}/subcategories`,
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
      <div className="flex flex-col items-center gap-y-3">
        <input
          required
          className="w-full input-field"
          placeholder={"Enter Sub Category Name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-4/6 input-field">
          {/* Add default "Select Category" option */}
          <option
            value=""
            disabled
            className="capitalize bg-neutral-400 text-neutral-800">
            Select Category
          </option>
          {categoryOptions}
        </select>
        <Button text={"Create"} type={"submit"} />
      </div>
    </form>
  );
};

export default SubcategoryForm;
