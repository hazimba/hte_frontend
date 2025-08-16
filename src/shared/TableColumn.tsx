import { deleteProductById } from "@/api/product/product";
import { Button, Popconfirm } from "antd";
import ToggleFavorite from "./ToggleFavorite";
import axios from "axios";
import { url } from "@/config/url";

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
    // excludedKeys.push("change_role_request");
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

      const changeSellerRole = async (data) => {
        console.log(data);

        try {
          const response = await axios.patch(`${url}/user/${data.id}`, {
            ...data,
            role: "seller",
          });
          console.log("Change role request response:", response.data);
        } catch (error) {
          console.error("Error changing role request:", error);
        }
        refetch();
        setData((prevData) =>
          prevData.map((item) =>
            item.id === data.id
              ? { ...item, change_role_request: !data.change_role_request }
              : item
          )
        );
      };

      if (key === "change_role_request") {
        return {
          title: "Change Role Request",
          dataIndex: key,
          key,
          render: (changeStatusRequest, data) => {
            return (
              <span
                className={
                  changeStatusRequest ? "text-blue-500" : "text-gray-500"
                }
              >
                {changeStatusRequest && data.role === "user" ? (
                  <>
                    <Button onClick={() => changeSellerRole(data)}>
                      Requsted
                    </Button>
                  </>
                ) : changeStatusRequest && data.role === "seller" ? (
                  <>Changed Already</>
                ) : (
                  <>Not Request</>
                )}
              </span>
            );
          },
        };
      }

      if (key === "role") {
        return {
          title: "Role",
          dataIndex: key,
          key,
          sort: (a, b) => a[key].localeCompare(b[key]),
          render: (text) => text.charAt(0).toUpperCase() + text.slice(1),
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
      dataIndex: "favorites",
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
  if (tab === "owner" && data.length > 0) {
    baseColumns.push({
      title: "ACTIONS",
      key: "actions",
      dataIndex: "actions",
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
