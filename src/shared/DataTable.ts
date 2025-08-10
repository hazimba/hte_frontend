import axios from "axios";
import { neondb_url } from "@/config/neondb";
import { filterProducts } from "@/api/product/product";

export const fetchDataTable = async (tab: string, filter, userId) => {
  // early return for unncessary api call
  if (tab === "owner") return [];

  // if statment specific for product tab action filter
  if (tab === "product") {
    const postBody = {
      user_id: userId,
      condition: filter.condition || null,
      product_type_id: filter.product_type_id || null,
      favorite: filter.favorite || false,
      name: filter.name || null,
    };

    // post request for product tab action filter
    // this is to avoid sending large query params in the url
    // and easier to manage the filter state
    const res = await filterProducts(postBody);

    if (!res.data) {
      throw new Error(
        `No data found for tab: ${tab} with filter: ${JSON.stringify(filter)}`
      );
    }
    return res.data;
  } else {
    // for other tabs, we can directly fetch data
    const res = await axios.get(`${neondb_url}/${tab}`);
    if (!res.data) {
      throw new Error(`No data found for tab: ${tab}`);
    }
    return res.data;
  }
};
