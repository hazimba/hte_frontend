import { ProductCondition } from "@/types/manual";

// This file exports a function to get condition options for products
export const getConditionOptions = () => {
  return Object.values(ProductCondition).map((condition) => ({
    label: condition,
    value: condition,
  }));
};
