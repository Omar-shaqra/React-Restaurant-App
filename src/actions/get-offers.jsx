import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const GetOffers = ({ setOffers }) => {
  return useQuery({
    queryKey: [setOffers, "offers"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_API_URL}/offers`
      );
      setOffers(data);
      return data;
    },
  });
};
