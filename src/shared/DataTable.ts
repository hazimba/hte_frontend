import axios from "axios";
import { url } from "@/config/url";
import { filterProducts } from "@/api/product/product";

// This function fetches data for the DataTable based on the provided tab and filter
// It handles different tabs like "owner" for fetching products by user ID
// and "product" for fetching products with specific filters
// It returns the fetched data or throws an error if no data is found
// The userId is used to fetch products owned by a specific user
// The filter object is used to apply specific conditions when fetching products
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
    const res = await axios.get(`${url}/${tab}`);
    if (!res.data) {
      throw new Error(`No data found for tab: ${tab}`);
    }
    return res.data;
  }
};
