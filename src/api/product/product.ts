import { neondb_url } from "@/config/neondb";

import axios from "axios";

export const fetchProducts = async () => {
  const res = await axios.get(`${neondb_url}/product`);
  return res.data;
};

export const fetchProductById = async (productId: number) => {
  const res = await axios.get(`${neondb_url}/product/`, {
    params: { id: productId },
  });
  return res.data;
};

export const getProductByUserId = async (userId: string, filter = {}) => {
  const res = await axios.get(
    `${neondb_url}/product?${new URLSearchParams(filter)}`,
    {
      params: { user_id: userId },
    }
  );
  return res.data;
};

export const deleteProductById = async (productId: number) => {
  try {
    const res = await axios.delete(`${neondb_url}/product/${productId}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
