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

export const GetMostSold = ({ setMostSold }) => {
  return useQuery({
    queryKey: [setMostSold, "mostSold"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_API_URL}/sells/most/sold`
      );
      setMostSold(data);
      return data;
    },
  });
};

export const GetDailyEarnings = ({ setDailyEarnings }) => {
  return useQuery({
    queryKey: [setDailyEarnings, "dailyEarnings"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_API_URL}/sells/most/sold`
      );
      setDailyEarnings(data);
      return data;
    },
  });
};
