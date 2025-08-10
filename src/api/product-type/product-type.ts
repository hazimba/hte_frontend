import axios from "axios";
import { url } from "@/config/url";

// This file contains API calls related to product types
export const fetchProductTypes = async () => {
  const res = await axios.get(`${url}/productType`);
  return res.data;
};

export const fetchProductTypeById = async (productTypeId: number) => {
  const res = await axios.get(`${url}/productType/${productTypeId}`);
  return res.data;
};

export const getProductTypeOptions = async () => {
  const productTypes = await fetchProductTypes();
  // map product types to options for select input
  // this is used in create and edit product form
  return productTypes.map((type) => ({
    label: type.name,
    value: type.id,
  }));
};
