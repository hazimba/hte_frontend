import axios from "axios";
import { neondb_url } from "@/config/neondb";

export const fetchProductTypes = async () => {
  const res = await axios.get(`${neondb_url}/productType`);
  return res.data;
};

export const fetchProductTypeById = async (productTypeId: number) => {
  const res = await axios.get(`${neondb_url}/productType/${productTypeId}`);
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
