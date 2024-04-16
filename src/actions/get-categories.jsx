import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const GetCategories = ({ setCategories }) => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_API_URL}/categories`
      );
      setCategories(data);
      return data;
    },
  });
};
