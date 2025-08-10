import { updateFavoriteStatus } from "@/api/favorite/favorite";
import { Switch } from "antd";

const ToggleFavorite = ({
  record,
  setFavorite,
  favorite,
  userId,
  isView = false,
}) => {
  const handleToggleFavorite = async (record) => {
    // extract individual product id
    const productId = record.id;

    // check if record.id exist in favorite array
    const exists = favorite.some((fav) => fav.product_id === productId);

    // this only for UI update
    // if exist, remove it from favorite array
    // for pre render
    if (exists && !isView) {
      setFavorite((prev) => prev.filter((fav) => fav.product_id !== productId));
    } else {
      // if not exist, add it to favorite array
      // create a new favorite object with product_id and user_id
      setFavorite((prev) => [
        ...prev,
        { product_id: productId, user_id: userId },
      ]);
    }

    try {
      // here is to update the favorite status in the backend
      // this will toggle the favorite status for the product
      const res = await updateFavoriteStatus(userId, productId);

      if (!res) {
        console.error("Failed to update favorite status:", record);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const isFav = favorite?.some((fav) => fav.product_id === record.id) || false;
  return (
    <div onClick={(e) => e.stopPropagation()} className="flex justify-center">
      <Switch
        className="text-yellow-500 cursor-pointer"
        onChange={() => handleToggleFavorite(record)}
        checked={isFav}
      />
    </div>
  );
};
export default ToggleFavorite;
