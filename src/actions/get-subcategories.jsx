import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const GetSubCategories = ({ setSubcategories }) => {
  return useQuery({
    queryKey: ["Subcategories"],
    queryFn: async () => {
      const { data } = await axios.get(
        "https://restaurant-menue-ordering-v1.onrender.com/api/v1/subcategories"
      );
      setSubcategories(data);
      return data;
    },
  });
};
