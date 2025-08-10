import { neondb_url } from "@/config/neondb";
import axios from "axios";

export const updateFavoriteStatus = async (userId, productId) => {
  try {
    const response = await axios.post(`${neondb_url}/favorite/toggle`, {
      product_id: productId,
      user_id: userId,
    });
    return response.data;
  } catch (error) {
    console.error("Error toggling favorite status:", error);
    throw error;
  }
};

export const getFavoritesByUserId = async (userId) => {
  try {
    const response = await axios.get(`${neondb_url}/favorite/user/${userId}`);
    console.log("Fetched favorites for user ID:", userId, response.data);
    if (!response.data) {
      throw new Error(`No favorites found for user ID: ${userId}`);
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching favorites by user ID:", error);
    throw error;
  }
};
