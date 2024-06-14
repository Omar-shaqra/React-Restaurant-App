import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import { DollarSign, ImagePlus, Trash2 } from "lucide-react";
import { GetOfferWithId } from "../../actions/get-offers";
import Button from "../../components/ui/button";

const EditOffer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [offer, setOffer] = useState(null);

  const [imagePreview, setImagePreview] = useState();

  GetOfferWithId({ setOffer, id });

  console.log("offer: ", offer);

  const [formData, setFormData] = useState({
    name: "",
    image: null,
    price: "",
  });

  useEffect(() => {
    if (offer) {
      setFormData((prevData) => ({
        ...prevData,
        name: offer.result.name || "",
        price: offer.result.price || "",
      }));

      setImagePreview(
        offer.result?.image.replace(
          "undefined/",
          `${import.meta.env.VITE_REACT_IMAGES_URL}/`
        )
      );
    }
  }, [offer]);

  const onSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();

    // Handling Form Data
    const formdata = new FormData();
    formdata.append("name", formData.name);
    formdata.append("price", formData.price);
    if (formData.image) {
      formdata.append("image", formData.image);
    }

    // API Request
    try {
      await axios.put(
        `${import.meta.env.VITE_REACT_API_URL}/offers/${id}`,
        formdata
      );
      toast.success("Offer Updated Successfully!");
      navigate("/admin/offers");
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  if (!offer)
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
          {offer.result.name}
        </span>
      </p>
      <div className="flex flex-row gap-6">
        {/* Name & Price */}
        <div className="flex flex-col gap-6 mt-5">
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="Name" className="text-xl font-bold">
              Name
            </label>
            <input
              required
              className="w-full capitalize input-field"
              placeholder="Enter Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          {/* Price */}
          <div className="flex flex-col gap-1">
            <label htmlFor="Name" className="text-xl font-bold">
              Price
            </label>
            <div className="relative flex gap-2">
              <input
                required
                name="price"
                type="number"
                step={0.01}
                value={formData.price}
                placeholder="Price for basic..."
                onChange={handleInputChange}
                className="input-field"
              />
              <DollarSign className="absolute text-gray-300 right-4 bottom-3" />
            </div>
          </div>

          {/* Submit button */}
          <Button text="Update" type="submit" disabled={formData.name === ""} />
        </div>

        {/* Image */}
        <div className="flex flex-col items-center gap-6">
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
              disabled={formData.image}
              onChange={handleImageChange}
            />
            {!formData.image ? (
              <span className="flex items-center justify-between gap-2 transition duration-300 image group-hover:text-green-300">
                <p>New Image</p>
                <ImagePlus />
              </span>
            ) : (
              <div className="flex items-center justify-between w-full gap-2 truncate max-w-52">
                <p className="items-start py-1 overflow-hidden text-blue-500 text-ellipsis">
                  {imagePreview ? formData.image.name : "Current Image"}
                </p>
                <Trash2
                  className="overflow-visible hover:text-red-400 "
                  onClick={() => {
                    setFormData((prevData) => ({
                      ...prevData,
                      image: null,
                    }));
                    setImagePreview(
                      offer.result?.image.replace(
                        "undefined/",
                        `${import.meta.env.VITE_REACT_IMAGES_URL}/`
                      )
                    );
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
        </div>
      </div>
    </form>
  );
};

export default EditOffer;
