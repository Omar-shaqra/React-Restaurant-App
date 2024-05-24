import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const GetOrders = ({ setOrders }) => {
  return useQuery({
    queryKey: [setOrders, "orders"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_API_URL}/sells`
      );
      setOrders(data);
      return data;
    },
    refetchInterval: 10000,
  });
};
