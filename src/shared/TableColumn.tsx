import { deleteProductById } from "@/api/product/product";
import { Popconfirm, Switch } from "antd";
import { updateFavoriteStatus } from "@/api/favorite/favorite";

export const columns = (
  data,
  tab,
  refetch,
  setOpenEditModal,
  setSelectedRow,
  favorite,
  userId,
  setData,
  setFavorite
) => {
  const excludedKeys = [
    "id",
    "created_at",
    "updated_at",
    "uuid",
    "product_type_id",
    "user_id",
  ];

  if (tab !== "owner") {
    excludedKeys.push("is_sold");
  }
  const baseColumns = Object.keys(data[0] || {})
    .filter((key) => !excludedKeys.includes(key))
    .map((key) => {
      if (key === "is_sold") {
        return {
          title: key.replace(/_/g, " ").toUpperCase(),
          dataIndex: key,
          key,
          render: (text) => (
            <span className={text ? "text-red-500" : "text-green-500"}>
              {text ? "Sold" : "Available"}
            </span>
          ),
        };
      }

      return {
        title: key.replace(/_/g, " ").toUpperCase(),
        dataIndex: key,
        key,
      };
    });

  const handleToggleFavorite = async (record) => {
    const productId = record.id;
    const exists = favorite.some((fav) => fav.product_id === productId);

    if (exists) {
      setFavorite((prev) => prev.filter((fav) => fav.product_id !== productId));
    } else {
      setFavorite((prev) => [
        ...prev,
        { product_id: productId, user_id: userId },
      ]);
    }

    try {
      const res = await updateFavoriteStatus(userId, productId);

      if (!res) {
        console.error("Failed to update favorite status:", record);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  if (tab === "product") {
    baseColumns.push({
      title: "Add to Favorites",
      key: "favorites",
      // @ts-expect-error: dynamic columns may not match Ant Design type
      render: (_, record) => {
        const isFav =
          favorite?.some((fav) => fav.product_id === record.id) || false;
        return (
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex justify-center"
          >
            <Switch
              className="text-yellow-500 cursor-pointer"
              onChange={() => handleToggleFavorite(record)}
              checked={isFav}
            />
          </div>
        );
      },
    });
  }

  const handleDelete = async (id) => {
    const res = await deleteProductById(id);
    // const res = true;
    if (res) {
      refetch();
    } else {
      console.error("Failed to delete product:", id);
    }
  };

  const handleEdit = (record) => {
    setOpenEditModal(true);
    // Implement edit functionality here
  };

  if (tab === "owner") {
    baseColumns.push({
      title: "ACTIONS",
      key: "actions",
      // @ts-expect-error: dynamic columns may not match Ant Design type
      render: (_, record) => (
        <div className="flex gap-2">
          <span
            className="text-blue-500 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(record);
              setSelectedRow(record);
            }}
          >
            Edit
          </span>
          <Popconfirm
            title="Are you sure you want to delete this product?"
            onConfirm={(e) => {
              e.stopPropagation();
              handleDelete(record.id);
            }}
            okText="Yes"
            cancelText="No"
          >
            <span
              className="text-red-500 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              Delete
            </span>
          </Popconfirm>
        </div>
      ),
    });
  }

  return baseColumns;
};
