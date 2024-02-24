import axios from "axios";
import { ImagePlus, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const CategoryForm = ({ categories, refetch }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

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
        setImage();
        toast.success("Category Added Successfully.");
      } catch (error) {
        toast.error("Error: " + error);
      }
    }
  };

  return (
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
            type="file"
            accept="image/*"
            value={""}
            className="image hidden"
            disabled={image}
            onChange={(e) => setImage(e.target.files[0])}
          />
          {!image ? (
            <span className="image flex justify-between gap-2 items-center w-full group-hover:text-green-300 transition duration-300">
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
        {/* Submit button */}
        <button
          type="submit"
          className=" items-center p-1 my-5 w-3/6 h-10 text-lg text-white bg-black bg-opacity-75 rounded-lg hover:bg-neutral-800 transition">
          Create
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
