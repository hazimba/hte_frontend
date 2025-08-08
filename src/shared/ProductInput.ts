import { getConditionOptions } from "./ConditionOptions";
import { getProductTypeOptions } from "./ProductTypeOptions";

export const productInput = async () => {
  return [
    {
      name: "name",
      key: "name",
      label: "Name",
      type: "text",
      rules: [{ required: true, message: "Please input the product name!" }],
    },
    {
      name: "description",
      key: "description",
      label: "Description",
      type: "textarea",
      rules: [
        { required: true, message: "Please input the product description!" },
      ],
    },
    {
      name: "price",
      key: "price",
      label: "Price",
      type: "number",
      rules: [{ required: true, message: "Please input the product price!" }],
    },
    {
      name: "years",
      key: "years",
      label: "Years of Use",
      type: "number",
      rules: [{ required: true, message: "Please input the years of use!" }],
    },
    {
      name: "product_type_id",
      key: "product_type_id",
      label: "Product Type",
      type: "select",
      options: getProductTypeOptions(),
      rules: [{ required: true, message: "Please select the product type!" }],
    },
    {
      name: "condition",
      key: "condition",
      label: "Condition",
      type: "select",
      options: getConditionOptions(),
      rules: [
        { required: true, message: "Please select the product condition!" },
      ],
    },
  ];
};
