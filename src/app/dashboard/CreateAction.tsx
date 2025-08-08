import axios from "axios";
import { neondb_url } from "@/config/neondb";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { Form, Input, Select } from "antd";
import { productInput } from "@/shared/ProductInput";
import { useUserLoggedInState } from "@/store/user";

const CreateAction = ({ tab, setData }) => {
  const [openModal, setOpenModal] = useState(false);
  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);
  const user = useUserLoggedInState((state) => state.user?.id);

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

    try {
      const response = await axios.post(`${neondb_url}/${tab}`, {
        ...postData,
      });
      console.log("Create response:", response);
      if (response.status === 201) {
        setData((prevUsers) => [...prevUsers, response.data]);
      } else {
        console.error("Failed to create record:", response.data);
      }
    } catch (error) {
      console.error("Error creating record:", error);
    }
  };

  return (
    <div className="pt-2">
      <PlusCircleOutlined onClick={() => setOpenModal(true)} />
      <Modal
        title={`Create ${tab}`}
        open={openModal}
        onCancel={() => setOpenModal(false)}
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
                  {field.type === "select" && (
                    <Select options={field.options} />
                  )}
                </Form.Item>
              ))}
              <Button type="primary" htmlType="submit" className="w-full">
                Create
              </Button>
            </>
          )}
        </Form>
      </Modal>
    </div>
  );
};
export default CreateAction;
