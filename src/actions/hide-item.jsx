import axios from "axios";
import toast from "react-hot-toast";

export const hideItem = async ({ id, active }) => {
  const formdata = new FormData();
  formdata.append("Active", !active);

  try {
    await axios.put(
      `${import.meta.env.VITE_REACT_API_URL}/products/${id}`,
      formdata
    );
    toast.success(`Product Updated.`);
  } catch (error) {
    toast.error("Error occurred: " + error.message);
  }
};
