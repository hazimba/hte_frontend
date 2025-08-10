import { url } from "@/config/url";
import axios from "axios";

// This file contains API calls related to products
// It includes functions to fetch all products, fetch a product by ID, fetch products by user ID, delete a product by ID, and filter products based on various criteria
// The functions use axios to make HTTP requests to the backend API endpoints defined in the url configuration
export const fetchProducts = async () => {
  const res = await axios.get(`${url}/product`);
  return res.data;
};

export const fetchProductById = async (productId: number) => {
  const res = await axios.get(`${url}/product/`, {
    params: { id: productId },
  });
  return res.data;
};

export const fetchProductByUserId = async (userId: string) => {
  const res = await axios.get(`${url}/product/user/${userId}`);
  return res.data;
};

export const deleteProductById = async (productId: number) => {
  try {
    const res = await axios.delete(`${url}/product/${productId}`);
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
    const res = axios.post(`${url}/product/filter`, postBody);
    return res;
  } catch (error) {
    console.error("Error filtering products:", error);
    throw error;
  }
};
