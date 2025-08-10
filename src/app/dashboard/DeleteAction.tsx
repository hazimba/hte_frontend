import { neondb_url } from "@/config/neondb";
import axios from "axios";
import { Popconfirm } from "antd";

interface RecordType {
  id: string;
}

interface DeleteActionProps {
  tab: string;
  record: RecordType;
  onDelete: (id: string) => void;
}

const DeleteAction = ({ record, onDelete, tab }: DeleteActionProps) => {
  const handleDelete = async () => {
    try {
      // straight delete not soft delete
      // this is to delete the record from the database
      const response = await axios.delete(`${neondb_url}/${tab}/${record.id}`);
      if (response.status === 200) {
        onDelete(record.id);
      } else {
        console.error("Failed to delete user:", response.data);
      }
      console.log("User deleted successfully:", record.id);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Popconfirm
      title={`Are you sure you want to delete this ${tab}?`}
      onConfirm={handleDelete}
      okText="Yes"
      cancelText="No"
    >
      <span
        onClick={(e) => e.stopPropagation()}
        className="text-red-500 cursor-pointer"
      >
        Delete
      </span>
    </Popconfirm>
  );
};
export default DeleteAction;
