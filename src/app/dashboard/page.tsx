"use client";
import { useUserLoggedInState } from "@/store/user";
import { ArrowLeftOutlined, UserOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import Link from "next/link";
import { useState } from "react";
import TableRender from "./TableRender";

// Dashboard component to render the main dashboard view
// It includes a header with user information and a tabbed interface for different sections
// The tabs include Products, Product Types, Users, and Your Products
// Each tab renders a TableRender component with the appropriate tab and userId props
const Dashboard = () => {
  const user = useUserLoggedInState((state) => state.user);
  const [activeKey, setActiveKey] = useState("your-products");
  const items = [
    { key: "products", label: "Products" },
    { key: "product-types", label: "Product Types" },
    { key: "users", label: "Users" },
    { key: "your-products", label: "Your Products" },
  ];

  // table display is shared component
  // so we can use the same component for all tabs
  // userId is pass for action state
  const renderTabContent = () => {
    switch (activeKey) {
      case "products":
        return <TableRender tab="product" userId={user?.id} />;
      case "product-types":
        return <TableRender tab="productType" />;
      case "users":
        return <TableRender tab="user" />;
      case "your-products":
        return <TableRender tab="owner" userId={user?.id} />;
      default:
        return null;
    }
  };

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
        destroyOnHidden={true}
        items={items}
      />
      <div className="w-[100%] !p-2 !px-6  h-full">{renderTabContent()}</div>
    </div>
  );
};
export default Dashboard;
