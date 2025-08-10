"use client";
import { useUserLoggedInState } from "@/store/user";
import { ArrowLeftOutlined, UserOutlined } from "@ant-design/icons";
import { Spin, Tabs } from "antd";
import Link from "next/link";
import TableRender from "./TableRender";
import { useState } from "react";

const Dashboard = () => {
  const user = useUserLoggedInState((state) => state.user);
  const [activeKey, setActiveKey] = useState("products");
  const items = [
    { key: "products", label: "Products" },
    { key: "product-types", label: "Product Types" },
    { key: "users", label: "Users" },
    { key: "your-products", label: "Your Products" },
  ];

  const renderTabContent = () => {
    switch (activeKey) {
      case "products":
        return <TableRender tab="product" userId={user.id} />;
      case "product-types":
        return <TableRender tab="productType" />;
      case "users":
        return <TableRender tab="user" />;
      case "your-products":
        return <TableRender tab="owner" userId={user.id} />;
      default:
        return null;
    }
  };

  if (!user) {
    <Spin className="!h-screen !w-screen" />;
  }

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
        activeKey={activeKey}
        onChange={setActiveKey}
        className="w-[100%] rounded"
        centered
        destroyOnHidden={true} // still good to keep
        items={items}
      />
      <div className="w-[100%] !p-2 !px-6  h-full">{renderTabContent()}</div>
    </div>
  );
};
export default Dashboard;
