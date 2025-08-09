"use client";
import { useUserLoggedInState } from "@/store/user";
import { ArrowLeftOutlined, UserOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import Link from "next/link";
import TableRender from "./TableRender";

const Dashboard = () => {
  const user = useUserLoggedInState((state) => state.user);
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
      children: <TableRender key="owner" tab="owner" userId={user?.id} />,
    },
  ];

  return (
    <div className="flex flex-col items-center !h-screen w-screen p-2 gap-2 bg-gray-200">
      <div className="flex items-center justify-between w-full p-4 bg-[#2C0E37] text-white rounded">
        <Link href="/" className="">
          <ArrowLeftOutlined />
        </Link>
        <span className="text-xl font-bold">Hi! {user?.name}</span>
        <UserOutlined />
      </div>
      <Tabs
        style={{ height: "100%" }}
        className="w-[100%] rounded !p-2 !px-6 border-1"
        defaultActiveKey="your-products"
        centered
        items={items}
      />
    </div>
  );
};
export default Dashboard;
