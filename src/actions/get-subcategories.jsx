import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const GetSubCategories = ({ setSubcategories }) => {
  return useQuery({
    queryKey: ["subcategories"],
    queryFn: async () => {
      const { data } = await axios.get(
        // "https://restaurant-menue-ordering-v1.onrender.com/api/v1/subcategories"
        "https://clean-plum-bass.cyclic.app/api/v1/subcategories"
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
        // `https://restaurant-menue-ordering-v1.onrender.com/api/v1/categories/${id}/subcategories`
        `https://clean-plum-bass.cyclic.app/api/v1/categories/${id}/subcategories`
      );
      setSubcategories(data);
      return data;
    },
  });
};
