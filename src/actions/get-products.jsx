import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const GetProducts = ({ setProducts }) => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios.get(
        // `https://restaurant-menue-ordering-v1.onrender.com/api/v1/products`
        `http://localhost:8000/api/v1/products`
      );
      setProducts(data);
      return data;
    },
  });
};

export const GetProductsWithCategoryId = ({ setProducts, id }) => {
  return useQuery({
    queryKey: [id],
    queryFn: async () => {
      const { data } = await axios.get(
        // `https://restaurant-menue-ordering-v1.onrender.com/api/v1/products?subcategories=${id}`
        `http://localhost:8000/api/v1/products?category=${id}`
      );
      setProducts(data);
      return data;
    },
  });
};

export const GetProductsWithSubcategoryId = ({ setProducts, id }) => {
  return useQuery({
    queryKey: [id],
    queryFn: async () => {
      const { data } = await axios.get(
        // `https://restaurant-menue-ordering-v1.onrender.com/api/v1/products?subcategories=${id}`
        `http://localhost:8000/api/v1/products?subcategories=${id}`
      );
      setProducts(data);
      return data;
    },
  });
};
