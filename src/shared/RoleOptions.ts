import { UserRole } from "@/types/manual";

export const getRoleOptions = () => {
  return Object.values(UserRole).map((role) => ({
    label: role,
    value: role.toLowerCase(),
  }));
};
