import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const GetOffers = ({ setOffers }) => {
  return useQuery({
    queryKey: [setOffers, "offers"],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://91.108.102.253:8000/api/v1/offers`
      );
      setOffers(data);
      return data;
    },
  });
};
