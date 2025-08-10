import { Products } from "@/types/types";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import ModalCreateUpdate from "./Form";
import { Button } from "antd";

interface CreateActionProps {
  tab: string;
  setData: (data: Products[]) => void;
  setOpenModal: (open: boolean) => void;
  openModal: boolean;
  selectedRow?: Products;
  isEdit?: boolean;
  userId?: string;
}

const CreateAction = ({
  tab,
  setData,
  selectedRow,
  setOpenModal,
  openModal,
  userId,
}: CreateActionProps) => {
  return (
    <div className="pt-2 w-full mb-4">
      <Button onClick={() => setOpenModal(true)}>Add New Product</Button>
      <ModalCreateUpdate
        tab={tab}
        setData={setData}
        selectedRow={selectedRow}
        setOpenModal={setOpenModal}
        openModal={openModal}
        userId={userId}
        isEdit={false}
      />
    </div>
  );
};
export default CreateAction;
