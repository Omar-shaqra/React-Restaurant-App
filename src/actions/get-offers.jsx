import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const GetOffers = ({ setOffers }) => {
  return useQuery({
    queryKey: [setOffers, "offers"],
    queryFn: async () => {
      const { data } = await axios.get(
        // `https://restaurant-menue-ordering-v1.onrender.com/api/v1/products`
        `http://localhost:8000/api/v1/offers`
      );
      setOffers(data);
      return data;
    },
  });
};
