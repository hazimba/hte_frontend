import { Products } from "@/types/types";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import ModalCreateUpdate from "./Form";

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
    <div className="pt-2">
      <PlusCircleOutlined onClick={() => setOpenModal(true)} />
      <ModalCreateUpdate
        tab={tab}
        setData={setData}
        selectedRow={selectedRow}
        setOpenModal={setOpenModal}
        openModal={openModal}
        userId={userId}
      />
    </div>
  );
};
export default CreateAction;
