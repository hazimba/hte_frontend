import axios from "axios";
import { neondb_url } from "@/config/neondb";

export const fetchDataTable = async (tab: string, filter, userId) => {
  if (tab === "owner") return [];
  console.log("tab:", tab);
  if (tab === "product") {
    const postBody = {
      user_id: userId,
      condition: filter.condition || null,
      product_type_id: filter.product_type_id || null,
      favorite: filter.favorite || false,
      name: filter.name || null,
    };

    const res = await axios.post(`${neondb_url}/product/filter`, postBody);

    if (!res.data) {
      throw new Error(
        `No data found for tab: ${tab} with filter: ${JSON.stringify(filter)}`
      );
    }
    return res.data;
  } else {
    const res = await axios.get(`${neondb_url}/${tab}`);
    if (!res.data) {
      throw new Error(`No data found for tab: ${tab}`);
    }
    return res.data;
  }
};
