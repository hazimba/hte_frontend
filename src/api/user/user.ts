import axios from "axios";
import { url } from "@/config/url";

export const fetchUser = async () => {
  const res = await axios.get(`${url}/user`);
  return res.data;
};

export const fetchUserById = async (userId: number) => {
  const res = await axios.get(`${url}/user/${userId}`);
  return res.data.name;
};

export const getUserOption = async () => {
  const users = await fetchUser();
  return users.map((i) => ({
    label: i.name,
    value: i.id,
  }));
};
