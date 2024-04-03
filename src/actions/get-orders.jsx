import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const GetOrders = ({ setOrders }) => {
  return useQuery({
    queryKey: [setOrders, "orders"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://restaurant-menue-ordering-v1.onrender.com/api/v1/sells`
      );
      setOrders(data);
      return data;
    },
  });
};
