import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const GetProducts = ({ setProducts }) => {
  return useQuery({
    queryKey: [setProducts, "products"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_API_URL}/products?sort=category`
      );
      setProducts(data);
      return data;
    },
  });
};

export const GetProductWithId = ({ setProduct, id }) => {
  return useQuery({
    queryKey: [id, setProduct, "product"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_API_URL}/products/${id}`
      );
      setProduct(data);
      return data;
    },
  });
};

export const GetProductsWithCategoryId = ({ setProducts, id }) => {
  return useQuery({
    queryKey: [id, setProducts, "category"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_API_URL}/products?category=${id}`
      );
      setProducts(data);
      return data;
    },
  });
};

export const GetProductsWithSubcategoryId = ({ setProducts, id }) => {
  return useQuery({
    queryKey: [id, setProducts, "subcategory"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_API_URL}/products?subcategories=${id}`
      );
      setProducts(data);
      return data;
    },
  });
};
