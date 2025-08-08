"use client";
import { getConditionOptions } from "@/shared/ConditionOptions";
import { Button, Form, Input, Select } from "antd";
import { getProductTypeOptions } from "@/shared/ProductTypeOptions";
import { getUserOption } from "@/shared/UserOptions";

import React, { useEffect, useState } from "react";

const FilterFunction = () => {
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

  return (
    <Form
      form={form}
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
      }}
      className=""
      onFinish={(values) => console.log("Filter values:", values)}
    >
      <Form.Item name="name" label="Name">
        <Input placeholder="Search by name" />
      </Form.Item>
      <Form.Item name="product_type_id" label="Product Type">
        <Select
          placeholder="Select product type"
          options={productTypeOptions}
          allowClear
        />
      </Form.Item>
      <Form.Item name="condition" label="Condition">
        <Select
          placeholder="Select condition"
          options={getConditionOptions()}
          allowClear
        />
      </Form.Item>
      <Form.Item name="user_id" label="Owner">
        <Select
          placeholder="Select owner"
          options={userOptions}
          mode="multiple"
        />
      </Form.Item>
      <div className="flex items-center mb-7">
        <Button type="primary" htmlType="submit" className="w-full">
          Filter
        </Button>
      </div>
    </Form>
  );
};
export default FilterFunction;
