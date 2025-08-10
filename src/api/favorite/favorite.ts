import { neondb_url } from "@/config/neondb";
import axios from "axios";

// This file contains API calls related to favorites
// It includes functions to update the favorite status of a product for a user and to fetch favorites
// The functions use axios to make HTTP requests to the backend API endpoints defined in the neondb_url configuration
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
    // Fetch favorites for a specific user
    if (!userId) {
      throw new Error("User ID is required to fetch favorites.");
    }
    const response = await axios.get(`${neondb_url}/favorite/user/${userId}`);

    if (!response.data) {
      throw new Error(`No favorites found for user ID: ${userId}`);
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching favorites by user ID:", error);
    throw error;
  }
};
