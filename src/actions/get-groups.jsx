import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const GetGroups = () => {
  return useQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_API_URL}/group`
      );
      return data;
    },
  });
};
