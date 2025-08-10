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

export const fetchProductByUserId = async (userId: string) => {
  const res = await axios.get(`${neondb_url}/product/user/${userId}`);
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

export const filterProducts = async (postBody) => {
  try {
    // post request for product tab action filter
    // this is to avoid sending large query params in the url
    // and easier to manage the filter state
    const res = axios.post(`${neondb_url}/product/filter`, postBody);
    return res;
  } catch (error) {
    console.error("Error filtering products:", error);
    throw error;
  }
};
