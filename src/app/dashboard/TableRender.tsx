import { neondb_url } from "@/config/neondb";
import { Spin, Switch, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import CreateAction from "./CreateAction";
import FilterFunction from "./FilterFunction";

interface TableRenderProps {
  tab: string;
}

const TableRender = ({ tab }: TableRenderProps) => {
  const [data, setData] = useState([]);
  const [actions, setActions] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`${neondb_url}/${tab}`);

        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetch();
  }, [tab]);

  const columns = Object.keys(data[0] || {})
    .filter(
      (key) =>
        key !== "id" &&
        key !== "created_at" &&
        key !== "updated_at" &&
        key !== "uuid" &&
        key !== "product_type_id" &&
        key !== "user_id" &&
        key !== "is_sold"
    )
    .map((key) => ({
      title: key.charAt(0).toUpperCase() + key.slice(1),
      dataIndex: key,
      key: key,
    }));

  // columns.push({
  //   title: "Actions",
  //   key: "actions",
  //   // @ts-expect-error: Ant Design Table expects a specific type for render, but dynamic columns may not match
  //   render: (_, record) => (
  //     <div className="flex gap-2">
  //       <span
  //         className="text-blue-500 cursor-pointer"
  //         onClick={() => console.log("Edit user:", record)}
  //       >
  //         Edit
  //       </span>
  //       <DeleteAction
  //         tab={tab}
  //         record={record}
  //         onDelete={(id) => {
  //           setData((prevUsers) => prevUsers.filter((user) => user.id !== id));
  //         }}
  //       />
  //       {tab === "product" && (
  //         <StarOutlined onClick={(e) => e.stopPropagation()} />
  //       )}
  //     </div>
  //   ),
  // });

  if (tab === "product") {
    columns.push({
      title: "Add to Favorites",
      key: "add_to_favorites",
      // @ts-expect-error: Ant Design Table expects a specific type for render, but dynamic columns may not match
      align: "center",
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

  return (
    <>
      <div
        className="flex justify-end cursor-pointer"
        onClick={() => setActions(!actions)}
      >
        {!actions ? "Show Action" : "Hide Action"}
      </div>
      {actions ? (
        <span className="mr-4 flex justify-between">
          <FilterFunction />
          {tab === "product" && <CreateAction tab={tab} setData={setData} />}
        </span>
      ) : (
        <></>
      )}
      {data.length > 0 ? (
        <Table
          key={tab}
          rowKey={"uuid"}
          pagination={{ pageSize: actions ? 3 : 8 }}
          scroll={{ y: "calc(100vh - 200px)" }}
          dataSource={data}
          columns={columns}
          onRow={(record) => ({
            onClick: () => {
              console.log("Row clicked:", record);
            },
          })}
        />
      ) : (
        <div className="flex justify-center items-center h-screen">
          <Spin
            size="large"
            className="flex w-full h-screen justify-center items-center h-full"
          />
        </div>
      )}
    </>
  );
};
export default TableRender;
