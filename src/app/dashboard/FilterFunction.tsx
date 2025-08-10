"use client";
import { getProductTypeOptions } from "@/api/product-type/product-type";
import { getConditionOptions } from "@/shared/ConditionOptions";
import { Checkbox, Form, Input, Select } from "antd";

import { useEffect, useState } from "react";

// FilterFunction component to handle filtering of products
// It provides input fields for searching by name, condition, product type, and a checkbox for showing favorites
// It uses Ant Design's Form component to manage the form state
// and calls onFilterChange whenever the input values change to update the filter state in the parent component
// This will trigger the API call to fetch filtered data based on the user's input
const FilterFunction = ({ onFilterChange }) => {
  const [form] = Form.useForm();
  const [productTypeOptions, setProductTypeOptions] = useState([]);

  useEffect(() => {
    const fetchProductTypeOptions = async () => {
      const options = await getProductTypeOptions();
      setProductTypeOptions(options);
    };

    fetchProductTypeOptions();
  }, []);

  const handleChange = (changedValue) => {
    form.setFieldsValue(changedValue);
    const updated = { ...form.getFieldsValue(), ...changedValue };
    onFilterChange(updated);
  };

  return (
    // everytime user change the input, it will call onFilterChange
    // this is to update the filter state in parent component
    // and trigger the API call to fetch filtered data
    <Form form={form} onValuesChange={handleChange}>
      <div>
        {/* <div className="flex flex-col"> */}
        <div className="flex gap-4">
          <Form.Item name="name">
            <Input placeholder="Search by name..." />
          </Form.Item>
          <Form.Item name="condition" valuePropName="value">
            <Select
              placeholder="Select condition..."
              options={getConditionOptions()}
              allowClear
              mode="multiple"
              style={{ minWidth: "200px", maxWidth: "400px" }}
              onChange={(value) =>
                onFilterChange((prev) => ({ ...prev, condition: value }))
              }
            />
          </Form.Item>
          <Form.Item name="product_type_id">
            <Select
              placeholder="Select product type..."
              options={productTypeOptions}
              allowClear
              onChange={(value) =>
                onFilterChange((prev) => ({ ...prev, product_type_id: value }))
              }
            />
          </Form.Item>
          <Form.Item
            name="favorite"
            valuePropName="checked"
            initialValue={false}
          >
            <Checkbox
              onChange={(e) =>
                onFilterChange((prev) => ({
                  ...prev,
                  favorite: e.target.checked,
                }))
              }
            >
              Show Favorite
            </Checkbox>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};
export default FilterFunction;
