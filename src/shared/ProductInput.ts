import { getConditionOptions } from "./ConditionOptions";
import { getProductTypeOptions } from "../api/product-type/product-type";

// Input to create a product
// This function fetches product type options and condition options
// and returns an array of field configurations for the product input form
export const productInput = async () => {
  // Fetch product type options and condition options from respective APIs
  const productTypeOptions = await getProductTypeOptions();
  const conditionOptions = getConditionOptions();

  return [
    {
      // the name key is used to bind the form input
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
      options: productTypeOptions,
      rules: [{ required: true, message: "Please select the product type!" }],
    },
    {
      name: "condition",
      key: "condition",
      label: "Condition",
      type: "select",
      options: conditionOptions,
      rules: [
        { required: true, message: "Please select the product condition!" },
      ],
    },
  ];
};
