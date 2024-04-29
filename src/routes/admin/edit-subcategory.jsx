import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import { GetSubCategoryWithId } from "../../actions/get-subcategories";
import Button from "../../components/ui/button";
import { GetCategories } from "../../actions/get-categories";

const EditSubcategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [subcategory, setSubcategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  // GetCategories({ setCategories });
  GetSubCategoryWithId({ setSubcategory, id });

  const [formData, setFormData] = useState({
    name: "",
    // category: null,
  });

  useEffect(() => {
    if (subcategory) {
      setFormData((prevData) => ({
        ...prevData,
        name: subcategory.result.name || "",
        // category: subcategory.result.category.name || "",
      }));
    }
  }, [subcategory]);

  const onSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();

    try {
      await axios.put(
        `${import.meta.env.VITE_REACT_API_URL}/subcategories/${id}`,
        {
          name: formData.name,
          // category: formData.category,
        }
      );
      toast.success("Subcategory Updated Successfully!");
      navigate("/admin/subcategories");
    } catch (error) {
      toast.error("Error occurred: " + error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const categoryOptions =
  //   categories &&
  //   categories.data?.map((item, index) => (
  //     <option
  //       className="p-2 m-2 text-lg text-center capitalize bg-black"
  //       key={index}
  //       value={categories.data[index]._id}>
  //       {categories.data[index].name}
  //     </option>
  //   ));

  if (!subcategory)
    return (
      <div className="overflow-hidden text-3xl text-white">Loading....</div>
    );

  return (
    <form
      className="flex flex-col items-center gap-4 mx-10 ml-auto text-white mt-14"
      onSubmit={onSubmit}>
      <p className="text-3xl font-semibold tracking-wider text-white">
        Edit:
        <span className="p-1 font-bold rounded bg-white/20">
          {subcategory.result.name}
        </span>
      </p>
      <div className="flex flex-row gap-6">
        {/* Name  */}
        <div className="flex flex-col gap-3">
          <label htmlFor="Name" className="text-xl font-bold">
            Name
          </label>
          <input
            required
            className="w-full h-10 pl-3 text-base capitalize bg-black border border-red-300 rounded-lg xl:h-12 focus:border-white bg-opacity-70"
            placeholder="Enter Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />

          {/* Categories */}
          {/* <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="h-10 pl-3 text-base capitalize bg-black border border-red-300 rounded-lg focus:border-white bg-opacity-70">
            {formData.category && (
              <option
                defaultValue={formData.category}
                className="capitalize bg-neutral-400 text-neutral-800">
                {formData.category}
              </option>
            )}
            {categoryOptions}
          </select> */}

          {/* Submit button */}
          <Button
            text="Update"
            type="submit"
            disabled={formData.title === "" || formData.description === ""}
          />
        </div>

        {/* Image */}
        {/* <div className="flex flex-col items-center gap-6">
          <label htmlFor="Image Preview" className="text-xl font-bold">
            Image Preview
          </label>
          <div
            className="flex items-center justify-start px-2 text-base text-gray-300 bg-black border border-red-300 rounded-lg cursor-pointer min-h-12 max-h-fit text-clip focus:border-white hover:cursor-pointer bg-opacity-70 group"
            onClick={() => document.querySelector(".image").click()}>
            <input
              type="file"
              accept="image/*"
              value={""}
              className="hidden image"
              disabled={formData.imageCover}
              onChange={handleImageChange}
            />
            {!formData.imageCover ? (
              <span className="flex items-center justify-between w-full gap-2 transition duration-300 image group-hover:text-green-300">
                <p>Upload Image</p>
                <ImagePlus />
              </span>
            ) : (
              <div className="flex items-center justify-between w-full gap-2 truncate max-w-52">
                <p className="items-start py-1 overflow-hidden text-blue-500 text-ellipsis">
                  {formData.imageCover.name
                    ? formData.imageCover.name
                    : formData.imageCover !== "" && "Current Image"}
                </p>
                <Trash2
                  className="overflow-visible hover:text-red-400 "
                  onClick={() => {
                    setFormData((prevData) => ({
                      ...prevData,
                      imageCover: null,
                    }));
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
        </div> */}
      </div>
    </form>
  );
};

export default EditSubcategory;
