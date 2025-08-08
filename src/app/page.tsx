"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Select } from "antd";
import { neondb_url } from "@/config/neondb";
import axios from "axios";
import { useUserLoggedInState } from "@/store/user";
import { DefaultOptionType } from "antd/es/select";

export default function Home() {
  const setUser = useUserLoggedInState((state) => state.setUser);
  const [userData, setUserData] = useState([]);
  const [onchange, setOnchange] = useState(false);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(`${neondb_url}/user`);
        setUserData(response.data);
      };
      fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  const options = userData.map((user) => ({
    value: user.id,
    label: user.name,
  }));

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
            options={options}
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
