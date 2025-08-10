"use client";
import { getUserOption } from "@/api/user/user";
import { useUserLoggedInState } from "@/store/user";
import { Select } from "antd";
import { DefaultOptionType } from "antd/es/select";
import Link from "next/link";
import { useEffect, useState } from "react";

// Home component to render the initial page
// It allows the user to select their role (e.g., Admin, User) before proceeding
// The selected role is stored in the user state using Zustand
// Once a role is selected, the user can proceed to the dashboard
export default function Home() {
  const setUser = useUserLoggedInState((state) => state.setUser);
  const [userOption, setUserOption] = useState([]);
  const [onchange, setOnchange] = useState(false);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await getUserOption();
        setUserOption(response);
      };
      fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  return (
    <div className="font-sans grid items-center justify-items-center min-h-screen gap-16 sm:p-20">
      <div className="flex items-center justify-center"></div>
      <div className="text-center flex flex-col gap-36 items-center justify-center">
        <div className="text-4xl font-bold ">Welcome to Preloved App</div>
        <div>
          <p className="text-lg mb-4">Tell us who you are</p>
          <Select
            className="w-64"
            placeholder="Select an option"
            onChange={(value, data: DefaultOptionType) => {
              setUser({ id: String(value), name: String(data.label) });
              setOnchange(true);
            }}
            options={userOption}
          />
        </div>
      </div>

      <p className="text-lg text-center">
        This is a simple Preloved App.{" "}
        {onchange ? (
          <Link href="/dashboard" className="text-blue-500 hover:underline">
            Proceed to Dashboard
          </Link>
        ) : (
          <span>Proceed to Dashboard</span>
        )}
      </p>
    </div>
  );
}
