"use client";
import { useUserLoggedInState } from "@/store/user";
import { ArrowLeftOutlined, UserOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import TableRender from "./TableRender";
import { url } from "@/config/url";

// Dashboard component to render the main dashboard view
// It includes a header with user information and a tabbed interface for different sections
// The tabs include Products, Product Types, Users, and Your Products
// Each tab renders a TableRender component with the appropriate tab and userId props
const Dashboard = () => {
  const user = useUserLoggedInState((state) => state.user);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await axios.get(`${url}/user/${user?.id}`);
      if (userData) {
        setIsAdmin(userData.data.role === "admin");
      }
    };
    fetchUser();
  }, [user?.id]);

  const [activeKey, setActiveKey] = useState("owner");
  const items = [
    { key: "product", label: "Products" },
    ...(isAdmin ? [{ key: "productType", label: "Product Types" }] : []),
    ...(isAdmin ? [{ key: "user", label: "Users" }] : []),
    { key: "owner", label: "Your Products" },
  ];
  // table display is shared component
  // so we can use the same component for all tabs
  // userId is pass for action state
  const renderTabContent = () => {
    switch (activeKey) {
      case "product":
        return <TableRender tab={activeKey} userId={user.id} />;
      case "productType":
        return <TableRender tab={activeKey} />;
      case "user":
        return <TableRender tab={activeKey} />;
      case "owner":
        return <TableRender tab={activeKey} userId={user.id} />;
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
