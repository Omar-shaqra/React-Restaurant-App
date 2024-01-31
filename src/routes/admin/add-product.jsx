import axios from "axios";
// import Swal from "sweetalert2";
import { DollarSign, ImagePlus, Tag, PlusSquare } from "lucide-react";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const AddProduct = () => {
  // const [form, setForm] = useState({
  //   title: "",
  //   price: "",
  //   quantity: "",
  //   description: "",
  // });

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [imageCover, setImageCover] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const { data } = await axios.get(
      `https://restaurant-menue-ordering-v1.onrender.com/api/v1/categories`
    );
    setCategories(data);
  };

  // const e=>setTitl = (e) => {
  //   setForm({
  //     ...form,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (categoryId === "") {
      toast.error("select category first");
    } else {
      setLoading(true);
      try {
        await axios.post(
          `https://restaurant-menue-ordering-v1.onrender.com/api/v1/products`,

          {
            title,
            price,
            quantity,
            description,
            category: categoryId,
            // imageCover,
          }
        );
        toast.success("Product added successfully");
        setLoading(false);
      } catch (error) {
        toast.error("Error occurred: " + error.message);
      } finally {
        setLoading(false);
        // getCategories();
        // getSubcategories();
      }
    }
  };

  const categoriesOptions =
    categories.data &&
    Object.values(categories.data).map((item, index) => (
      <option
        className="capitalize bg-black text-center font-semibold"
        key={index}
        value={categories.data[index]._id}>
        {categories.data[index].name}
      </option>
    ));

  return (
    <div className="my-5 text-2xl font-semibold flex flex-col gap-4 text-white overflow-visible">
      <h1 className="self-center font-extrabold tracking-wider">
        All Products
      </h1>
      <div className="flex flex-col"></div>
      <form
        onSubmit={onSubmit}
        className="mt-14 gap-4 flex flex-col ml-auto mx-16 items-center">
        <h1 className="font-extrabold tracking-wider mr-auto">Add Product</h1>
        <div className="flex flex-row gap-6">
          <div className="flex flex-col gap-6">
            {/* Title */}
            <div className="relative">
              <input
                required
                name="title"
                // value={title}
                className="text-base border 2xl:w-[400px] lg:w-[300px] h-12 border-red-300 focus:border-white pl-3 bg-black bg-opacity-70 rounded-lg"
                placeholder={"Enter Title"}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="relative">
                <span className="absolute right-8 bottom-3 text-gray-300">
                  <Tag />
                </span>
              </div>
            </div>
            {/* Quantity */}
            <div className="relative">
              <input
                required
                // value={quantity}
                name="quantity"
                className="text-base border 2xl:w-[400px] lg:w-[300px] h-12 border-red-300 focus:border-white pl-3 bg-black bg-opacity-70 rounded-lg"
                placeholder={"Enter Quantity"}
                type="number"
                min={1}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <span className="absolute right-8 bottom-3 text-gray-300">
                <PlusSquare />
              </span>
            </div>
            {/* Price */}
            <div className="relative">
              <input
                required
                // value={price}
                name="price"
                className="text-base border 2xl:w-[400px] lg:w-[300px] h-12 border-red-300 focus:border-white pl-3 bg-black bg-opacity-70 rounded-lg"
                placeholder={"Enter Price"}
                type="number"
                min={1}
                onChange={(e) => setPrice(e.target.value)}
              />
              <span className="absolute right-8 bottom-3 text-gray-300">
                <DollarSign />
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            {/* Image */}
            <div className="relative">
              <input
                value={imageCover}
                // required
                // type="file"
                accept="image/*"
                className="text-base border 2xl:w-[400px] lg:w-[300px] h-12 border-red-300 focus:border-white pl-3 hover:cursor-pointer bg-black bg-opacity-70 rounded-lg items-center pt-2"
                onChange={(e) => setImageCover(e.target.value)}
                // onChange={(e) => {
                // setImageCover(URL.createObjectURL(e.target.files[0]));
                // }}
              />
              <span className="absolute right-8 bottom-3 text-gray-300">
                <ImagePlus />
              </span>
            </div>
            {/* Description */}
            <textarea
              required
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Description"
              className="text-base border 2xl:w-[400px] lg:w-[300px] min-h-12 max-h-12 border-red-300 focus:border-white resize-none m-0 pl-3 pr-14 pt-3 bg-black bg-opacity-70 rounded-lg"
            />
            {/* Categories */}
            <select
              onChange={(e) => setCategoryId(e.target.value)}
              className="text-base border 2xl:w-[400px] lg:w-[300px] h-12  border-red-300 focus:border-white pl-3 bg-black bg-opacity-70 rounded-lg capitalize">
              <option
                disabled
                selected
                className="bg-neutral-400 text-neutral-800">
                Select Category
              </option>
              {categoriesOptions}
            </select>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="justify-center items-center p-1 my-5 2xl:w-[400px] lg:w-[300px] h-10 text-lg text-white bg-black bg-opacity-55 rounded-lg hover:bg-neutral-700 transition disabled:cursor-not-allowed disabled:bg-black">
          {/* {loading ? <LoadingSpinner size={'35'} /> : 'Create'} */}
          create
        </button>
        <img src={imageCover && imageCover} alt="" className="w-60" />
      </form>
    </div>
  );
};

export default AddProduct;
