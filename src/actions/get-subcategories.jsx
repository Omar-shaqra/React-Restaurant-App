import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const GetSubCategories = ({ setSubcategories }) => {
  return useQuery({
    queryKey: ["subcategories"],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://91.108.102.253:8000/api/v1/subcategories"
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
        // `http://91.108.102.253:8000/api/v1/categories/${id}/subcategories`
        `http://91.108.102.253:8000/api/v1/categories/${id}/subcategories`
      );
      setSubcategories(data);
      return data;
    },
  });
};
