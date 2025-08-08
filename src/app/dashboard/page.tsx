"use client";
import { ArrowLeftOutlined, UserOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import Link from "next/link";
import TableRender from "./TableRender";
import { useUserLoggedInState } from "@/store/user";

const Dashboard = () => {
  const user = useUserLoggedInState((state) => state.user?.name);
  const items = [
    {
      key: "products",
      label: "Products",
      children: <TableRender key="product" tab="product" />,
    },
    {
      key: "product-types",
      label: "Product Types",
      children: <TableRender key="product_types" tab="productType" />,
    },
    {
      key: "users",
      label: "Users",
      children: <TableRender key="users" tab="user" />,
    },
    {
      key: "your-products",
      label: "Your Products",
      children: "here your products will be listed",
    },
  ];

  return (
    <div className="flex flex-col items-center !h-screen w-screen p-2 gap-2">
      <div className="flex items-center justify-between w-full p-4 bg-gray-100">
        <Link href="/" className="">
          <ArrowLeftOutlined />
        </Link>
        <span className="text-xl font-bold">Hi! {user}</span>

        <UserOutlined />
      </div>
      <Tabs
        style={{ height: "100%" }}
        className="w-[100%] rounded !p-2 !px-6 border-1"
        defaultActiveKey="users"
        centered
        items={items}
      />
    </div>
  );
};
export default Dashboard;
