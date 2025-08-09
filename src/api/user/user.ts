import axios from "axios";
import { neondb_url } from "@/config/neondb";

export const fetchUser = async () => {
  const res = await axios.get(`${neondb_url}/user`);
  return res.data;
};

export const fetchUserById = async (userId: number) => {
  const res = await axios.get(`${neondb_url}/user/${userId}`);
  return res.data.name;
};

export const getUserOption = async () => {
  const users = await fetchUser();
  return users.map((i) => ({
    label: i.name,
    value: i.id,
  }));
};
