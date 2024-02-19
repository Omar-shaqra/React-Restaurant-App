import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const GetCategories = ({ setCategories }) => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axios.get(
        // `https://restaurant-menue-ordering-v1.onrender.com/api/v1/categories`
        `http://localhost:8000/api/v1/categories`
      );
      setCategories(data);
      return data;
    },
  });
};
