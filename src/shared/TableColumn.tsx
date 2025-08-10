import { updateFavoriteStatus } from "@/api/favorite/favorite";
import { deleteProductById } from "@/api/product/product";
import { Popconfirm, Switch } from "antd";
import ToggleFavorite from "./ToggleFavorite";

// shared function to generate table columns based on data and tab type
// is used to show products from user and all products
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

  // to exclude key from product table
  if (tab !== "owner") {
    excludedKeys.push("is_sold");
  }

  // all columns is mapped and generated dynamically here
  const baseColumns = Object.keys(data[0] || {})
    .filter((key) => !excludedKeys.includes(key))
    .map((key) => {
      if (key === "is_sold") {
        return {
          title: key.replace(/_/g, " ").toUpperCase(),
          dataIndex: key,
          key,
          sort: (a, b) => a[key] - b[key],
          render: (text) => (
            <span
              key={key}
              className={text ? "text-red-500" : "text-green-500"}
            >
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

  // toggle action is only available for product tab
  if (tab === "product") {
    baseColumns.push({
      title: "Add to Favorites",
      key: "favorites",
      // @ts-expect-error: dynamic columns may not match Ant Design type
      render: (_, record) => {
        return (
          <ToggleFavorite
            setFavorite={setFavorite}
            userId={userId}
            favorite={favorite}
            record={record}
          />
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

  // only owner can edit and delete their own products
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
              // prevent event bubbling
              e.stopPropagation();
              // this is openModal and pass the selected row value to OpenEditModal
              setOpenEditModal(true);
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
