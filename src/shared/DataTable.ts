import axios from "axios";
import { neondb_url } from "@/config/neondb";

export const fetchDataTable = async (tab: string, filter = {}) => {
  // Clean up the filter object for URL
  const queryParams = new URLSearchParams();
  console.log("Filter before cleanup:", filter);
  Object.entries(filter).forEach(([key, value]) => {
    if (value === null || value === "" || value === undefined) return;
    if (Array.isArray(value)) {
      value.forEach((v) => queryParams.append(key, v));
    } else {
      queryParams.append(key, String(value));
    }
  });
  console.log("Filter after cleanup:", queryParams.toString());
  const url = `${neondb_url}/${tab}?${queryParams.toString()}`;
  console.log("Fetching data from URL:", url);

  const res = await axios.get(url);
  if (!res.data) {
    throw new Error(`No data found for tab: ${tab}`);
  }
  return res.data;
};

// export const fetchDataTable = async (tab: string, filter = {}) => {
//   const res = await axios.get(`${neondb_url}/${tab}`);
//   return res.data;
// };
