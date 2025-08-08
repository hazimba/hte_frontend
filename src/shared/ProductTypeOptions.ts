import axios from "axios";
import { neondb_url } from "@/config/neondb";

export const fetchProductTypes = async () => {
  const res = await axios.get(`${neondb_url}/productType`);
  return res.data;
};

export const getProductTypeOptions = async () => {
  const productTypes = await fetchProductTypes();
  return productTypes.map((type) => ({
    label: type.name,
    value: type.id,
  }));
};
