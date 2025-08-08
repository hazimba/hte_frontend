import { ProductCondition } from "@/types/manual";

export const getConditionOptions = () => {
  return Object.values(ProductCondition).map((condition) => ({
    label: condition,
    value: condition,
  }));
};
