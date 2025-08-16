"use client";
import { url } from "@/config/url";
import { getRoleOptions } from "@/shared/RoleOptions";
import { Button, Checkbox, Form, Input, Select } from "antd";
import axios from "axios";
import { UserRole } from "@/types/manual";
import { useRouter } from "next/navigation";
import { useUserLoggedInState } from "@/store/user";

const SignUp = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const setUser = useUserLoggedInState((state) => state.setUser);

  const handleSubmit = async (values) => {
    const users = await axios.get(`${url}/user`);
    const userExists = users.data.some((user) => user.email === values.email);

    if (userExists) {
      console.error("User with this email already exists.");
      return;
    }

    try {
      const createUser = {
        ...values,
        // user_role is lowerCase to match the API expectations
        role: values.role.toLowerCase(),
      };

      const response = await axios.post(`${url}/user`, createUser);
      if (response.data) {
        // When user is created, get the user data back (@.@")
        const getUser = await axios.get(`${url}/user/${values.email}`);
        console.log("Fetched User:", getUser.data);

        setUser({
          id: getUser.data.id,
          name: getUser.data.name,
        });
        console.log("Redirecting to dashboard...");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const rules = [
    {
      required: false,
      message: "This field is required",
    },
  ];

  return (
    <div className="flex flex-col gap-8 items-center justify-center min-h-screen bg-gray-100">
      <div className="text-2xl">Sign Up Page</div>
      <Form
        form={form}
        layout="vertical"
        className="w-96"
        onFinish={handleSubmit}
        initialValues={{ role: UserRole.USER, change_role_request: false }}
      >
        <Form.Item name="name" label="Name" rules={rules}>
          <Input placeholder="Enter your name" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          validateTrigger="onBlur"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              validator: async (_, value) => {
                if (!value) return Promise.resolve();

                try {
                  const users = await axios.get(`${url}/user`);
                  const userExists = users.data.some(
                    (user) => user.email === value
                  );

                  if (userExists) {
                    return Promise.reject(
                      new Error("User with this email already exists.")
                    );
                  }
                  return Promise.resolve();
                } catch (error) {
                  console.error("Error checking user existence:", error);
                  return Promise.reject(
                    new Error("Failed to check user existence.")
                  );
                }
              },
            },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>
        <Form.Item name="phone" label="Phone Number" rules={rules}>
          <Input placeholder="Enter your phone number" />
        </Form.Item>
        <Form.Item name="role" label="Role" rules={rules}>
          <Select
            disabled
            placeholder="Select your role"
            options={getRoleOptions()}
          />
        </Form.Item>
        <Form.Item name="change_role_request" valuePropName="checked">
          <Checkbox>Request to be a Seller</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default SignUp;
