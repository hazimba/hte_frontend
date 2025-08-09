import { deleteProductById } from "@/api/product/product";
import { Popconfirm, Switch } from "antd";

export const columns = (
  data,
  tab,
  refetch,
  setOpenEditModal,
  setSelectedRow
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

  if (tab === "product") {
    baseColumns.push({
      title: "Add to Favorites",
      key: "favorites",
      // @ts-expect-error: dynamic columns may not match Ant Design type
      render: (_, record) => (
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex justify-center"
        >
          <Switch
            className="text-yellow-500 cursor-pointer"
            onChange={(e) => console.log("Toggle favorite:", record, e)}
          />
        </div>
      ),
    });
  }

  const handleDelete = async (id) => {
    const res = await deleteProductById(id);
    // const res = true;
    if (res) {
      console.log("Product deleted successfully:", id);
      refetch();
    } else {
      console.error("Failed to delete product:", id);
    }
  };

  const handleEdit = (record) => {
    console.log("Edit product:", record);
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
