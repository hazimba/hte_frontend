import { Products } from "@/types/types";
import ModalCreateUpdate from "./Form";

interface UpdateActionProps {
  tab: string;
  setData: (data: Products[]) => void;
  selectedRow?: Products;
  setOpenModal?: (open: boolean) => void;
  openModal?: boolean;
  isEdit?: boolean;
  userId: string;
}
const ModalUpdate = ({
  tab,
  setData,
  selectedRow,
  setOpenModal,
  openModal,
  userId,
  isEdit,
}: UpdateActionProps) => {
  return (
    <div className="pt-2">
      <ModalCreateUpdate
        tab={tab}
        setData={setData}
        selectedRow={selectedRow}
        setOpenModal={setOpenModal}
        openModal={openModal}
        userId={userId}
        isEdit={isEdit}
      />
    </div>
  );
};
export default ModalUpdate;
