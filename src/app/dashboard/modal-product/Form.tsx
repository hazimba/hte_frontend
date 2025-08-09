import { getProductByUserId } from "@/api/product/product";
import { neondb_url } from "@/config/neondb";
import { fetchDataTable } from "@/shared/DataTable";
import { productInput } from "@/shared/ProductInput";
import { useUserLoggedInState } from "@/store/user";
import { Button, Form, Input, Modal, Select } from "antd";
import axios from "axios";
import { use, useEffect, useState } from "react";

const CreateUpdateForm = ({
  tab,
  setData,
  selectedRow,
  setOpenModal,
  openModal,
  userId,
  isEdit,
}) => {
  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);
  const user = useUserLoggedInState((state) => state.user?.id);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  useEffect(() => {
    if (selectedRow) {
      form.setFieldsValue(selectedRow);
    } else {
      form.resetFields();
    }
  }, [selectedRow, form]);

  useEffect(() => {
    const loadInputs = async () => {
      const inputs = await productInput();
      setFields(inputs);
    };

    if (tab === "product") {
      loadInputs();
    }
  }, [tab]);

  const handleCreate = async (value) => {
    console.log("Creating record with values:", value);

    const postData = {
      ...value,
      user_id: user,
      is_sold: false,
    };

    if (isEdit && selectedRow) {
      const editData = {
        ...postData,
        id: selectedRow.id,
      };

      try {
        console.log("Updating record with data:", editData);
        const res = await axios.patch(
          `${neondb_url}/product/${selectedRow.id}`,
          editData
        );
        console.log("Update response:", res.data);
        setReloadTrigger((prev) => prev + 1);
      } catch (error) {
        console.error("Error updating record:", error);
      }
    } else {
      try {
        const response = await axios.post(`${neondb_url}/${tab}`, {
          ...postData,
        });
        console.log("Create response:", response);
        if (response.status === 201) {
          setData((prevData) => [...prevData, response.data]);
          setReloadTrigger((prev) => prev + 1);
        } else {
          console.error("Failed to create record:", response.data);
        }
      } catch (error) {
        console.error("Error creating record:", error);
      }
    }
  };

  useEffect(() => {
    if (userId) {
      getProductByUserId(userId).then(setData).catch(console.error);
    } else {
      fetchDataTable(tab).then(setData).catch(console.error);
    }
  }, [userId, reloadTrigger, tab, setData]);

  return (
    <Modal
      title={isEdit ? `Update ${tab}` : `Create ${tab}`}
      open={openModal}
      onCancel={() => setOpenModal(false)}
      footer={null}
    >
      <Form
        key={tab}
        form={form}
        layout="vertical"
        name="create_form"
        onFinish={(value) => {
          handleCreate(value);
          setOpenModal(false);
        }}
        initialValues={{ condition: "New" }}
      >
        {tab === "product" && (
          <>
            {fields.map((field) => (
              <Form.Item
                key={field.name}
                name={field.name}
                label={field.label}
                rules={field.rules}
              >
                {field.type === "text" && <Input />}
                {field.type === "textarea" && <Input.TextArea />}
                {field.type === "number" && <Input type="number" />}
                {field.type === "select" && <Select options={field.options} />}
              </Form.Item>
            ))}
            <Button type="primary" htmlType="submit" className="w-full">
              {isEdit ? "Update" : "Create"}
            </Button>
          </>
        )}
      </Form>
    </Modal>
  );
};
export default CreateUpdateForm;
