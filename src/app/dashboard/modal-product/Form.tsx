import { fetchProductByUserId } from "@/api/product/product";
import { neondb_url } from "@/config/neondb";
import { productInput } from "@/shared/ProductInput";
import { useUserLoggedInState } from "@/store/user";
import { Button, Form, Input, Modal, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

// CreateUpdateForm component to handle both creating and updating products
// It uses the same form for both actions
// The form fields are dynamically generated based on the productInput configuration
// It fetches the product data if updating, and posts new data if creating
const CreateUpdateForm = ({
  tab,
  setData,
  selectedRow,
  setOpenModal,
  openModal,
  userId,
  isUpdate,
}) => {
  // this component handles both creating and updating products
  // it uses the same form for both actions
  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);
  const user = useUserLoggedInState((state) => state.user?.id);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  useEffect(() => {
    if (selectedRow) {
      // here to automatically fill the form with selected row data when updateModal is opened
      // if selectedRow is provided, it means we are updating an existing product
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

  // handle form submission for both create and update actions
  // above if to update the product while below else to create a new product
  const handleCreateUpdate = async (value) => {
    const postData = {
      ...value,
      user_id: user,
      // is_sold always false when creating a new product
      is_sold: false,
    };

    if (isUpdate && selectedRow) {
      const editData = {
        ...postData,
        id: selectedRow.id,
      };

      try {
        const res = await axios.patch(
          `${neondb_url}/${tab}/${selectedRow.id}`,
          // pass the data that we want to update as a body
          editData
        );
        if (res.status === 200) {
          // update the table data with the updated record
          setData((prevData) =>
            prevData.map((item) =>
              item.id === selectedRow.id ? { ...item, ...editData } : item
            )
          );
        }
        form.resetFields();
        setOpenModal(false);
        setReloadTrigger((prev) => prev + 1);
      } catch (error) {
        console.error("Error updating record:", error);
      }
    } else {
      try {
        const response = await axios.post(`${neondb_url}/${tab}`, {
          ...postData,
        });
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
    // when view modal to not triggered to call the api
    // when create successfully, table data will be updated
    if (userId && !isUpdate) {
      const fetchProducts = async () => {
        try {
          const products = await fetchProductByUserId(userId);
          setData(products);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      fetchProducts();
    }
  }, [userId, reloadTrigger, tab, setData, isUpdate]);

  return (
    <Modal
      title={isUpdate ? `Update ${tab}` : `Create ${tab}`}
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
          handleCreateUpdate(value);
          setOpenModal(false);
        }}
        initialValues={{ condition: "New" }}
      >
        {tab === "product" && (
          <>
            {/* fields declare hardcoded from ProductInput */}
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
              {isUpdate ? "Update" : "Create"}
            </Button>
          </>
        )}
      </Form>
    </Modal>
  );
};
export default CreateUpdateForm;
