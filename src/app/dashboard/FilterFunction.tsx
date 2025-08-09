"use client";
import { getConditionOptions } from "@/shared/ConditionOptions";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { getProductTypeOptions } from "@/api/product-type/product-type";
import { getUserOption } from "@/api/user/user";

import React, { useEffect, useState } from "react";

const FilterFunction = ({ onFilterChange }) => {
  const [form] = Form.useForm();
  const [productTypeOptions, setProductTypeOptions] = useState([]);
  const [userOptions, setUserOptions] = useState([]);

  useEffect(() => {
    const fetchProductTypeOptions = async () => {
      const options = await getProductTypeOptions();
      setProductTypeOptions(options);
    };

    const fetchUserOptions = async () => {
      const userOptions = await getUserOption();
      setUserOptions(userOptions);
    };

    fetchUserOptions();
    fetchProductTypeOptions();
  }, []);

  const handleChange = (changedValue) => {
    form.setFieldsValue(changedValue);
    const updated = { ...form.getFieldsValue(), ...changedValue };
    onFilterChange(updated);
  };

  return (
    <Form form={form} onValuesChange={handleChange}>
      <div className="mb-4">
        {/* <div className="flex flex-col"> */}
        <div className="flex gap-4">
          <Form.Item name="name">
            <Input placeholder="Search by name" />
          </Form.Item>
          <Form.Item name="condition" valuePropName="value">
            <Select
              placeholder="Select condition"
              options={getConditionOptions()}
              allowClear
              onChange={(value) =>
                onFilterChange((prev) => ({ ...prev, condition: value }))
              }
            />
          </Form.Item>
          <Form.Item name="product_type_id">
            <Select
              placeholder="Select product type"
              options={productTypeOptions}
              allowClear
              mode="multiple"
              style={{ minWidth: "200px", maxWidth: "400px" }}
              onChange={(value) =>
                onFilterChange((prev) => ({ ...prev, product_type_id: value }))
              }
            />
          </Form.Item>
          {/* <Form.Item
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
            />
          </Form.Item> */}
        </div>
        {/* <div className="flex justify-between">
            <Form.Item name="user_id">
              <Select
                placeholder="Select owner"
                options={userOptions}
                mode="multiple"
                style={{ width: "530px" }}
                onChange={(value) => console.log("Selected users:", value)}
              />
            </Form.Item>
          </div> */}
        {/* </div> */}
        <Button type="primary" htmlType="submit" className="">
          Filter
        </Button>
      </div>
    </Form>
  );
};
export default FilterFunction;
