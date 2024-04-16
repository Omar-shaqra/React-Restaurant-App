import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const GetSubCategories = ({ setSubcategories }) => {
  return useQuery({
    queryKey: ["subcategories"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_API_URL}/subcategories`
      );
      setSubcategories(data);
      return data;
    },
  });
};

export const GetSubCategoriesWithId = ({ setSubcategories, id }) => {
  return useQuery({
    queryKey: [id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_API_URL}/categories/${id}/subcategories`
      );
      setSubcategories(data);
      return data;
    },
  });
};
