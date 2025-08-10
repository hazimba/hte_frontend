import { Products } from "@/types/types";
import ModalCreateUpdate from "./Form";

interface UpdateActionProps {
  tab: string;
  setData: (data: Products[]) => void;
  selectedRow?: Products;
  setOpenModal?: (open: boolean) => void;
  openModal?: boolean;
  isUpdate?: boolean;
  userId: string;
}
const ModalUpdate = ({
  tab,
  setData,
  selectedRow,
  setOpenModal,
  openModal,
  userId,
  isUpdate,
}: UpdateActionProps) => {
  return (
    <div className="pt-2">
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
        isUpdate={isUpdate}
      />
    </div>
  );
};
export default ModalUpdate;
