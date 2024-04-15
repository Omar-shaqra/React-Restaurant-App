import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const GetCategories = ({ setCategories }) => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://91.108.102.253:8000/api/v1/categories`
      );
      setCategories(data);
      return data;
    },
  });
};
