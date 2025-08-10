import { Products } from "@/types/types";
import { Button } from "antd";
import ModalCreateUpdate from "./Form";

interface CreateActionProps {
  tab: string;
  setData: (data: Products[]) => void;
  setOpenModal: (open: boolean) => void;
  openModal: boolean;
  selectedRow?: Products;
  isUpdate?: boolean;
  userId?: string;
}

// This component is used to create a new product
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
      {/* ModalCreateUpdate is used to create or update a product */}
      {/* if selectedRow is passed, it will be used to update the product */}
      {/* if not, it will create a new product */}
      {/* isUpdate is used to determine if the modal is for create or update */}
      <ModalCreateUpdate
        tab={tab}
        setData={setData}
        selectedRow={selectedRow}
        setOpenModal={setOpenModal}
        openModal={openModal}
        userId={userId}
        isUpdate={false}
      />
    </div>
  );
};
export default CreateAction;
