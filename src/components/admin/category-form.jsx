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
          `${import.meta.env.VITE_REACT_API_URL}/categories`,

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
      className="flex flex-col gap-4 mx-16 ml-auto mt-14">
      <h1 className="font-extrabold tracking-wider">Add New Category</h1>
      <div className="flex flex-col items-center gap-y-3">
        <input
          required
          className="w-full h-10 pl-3 text-base capitalize bg-black border border-red-300 rounded-lg xl:h-12 focus:border-white bg-opacity-70"
          placeholder={"Enter Category Name"}
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div
          className="flex items-center justify-start px-2 text-base text-gray-300 bg-black border border-red-300 rounded-lg cursor-pointer min-h-12 max-h-fit text-clip focus:border-white hover:cursor-pointer bg-opacity-70 group"
          onClick={() => document.querySelector(".image").click()}>
          <input
            type="file"
            accept="image/*"
            value={""}
            className="hidden image"
            disabled={image}
            onChange={(e) => setImage(e.target.files[0])}
          />
          {!image ? (
            <span className="flex items-center justify-between w-full gap-2 transition duration-300 image group-hover:text-green-300">
              <p>Upload Image</p>
              <ImagePlus />
            </span>
          ) : (
            <div className="flex items-center justify-between w-full gap-2 truncate max-w-52 ">
              <p className="items-start py-1 overflow-hidden text-blue-500 text-ellipsis">
                {image.name !== "" && image.name}
              </p>
              <Trash2
                key={image ? image.name : "empty"}
                className="overflow-visible hover:text-red-400 "
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
          className="items-center w-3/6 h-10 p-1 my-5 text-lg text-white transition bg-black bg-opacity-75 rounded-lg hover:bg-neutral-800">
          Create
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
