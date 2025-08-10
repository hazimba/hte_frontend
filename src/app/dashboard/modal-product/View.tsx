"use client";
import { Products } from "@/types/types";
import { Modal, Spin, Tag } from "antd";
import { fetchProductTypeById } from "@/api/product-type/product-type";
import { fetchUserById } from "@/api/user/user";
import { useEffect, useState } from "react";

interface ViewActionProps {
  selectedRow?: Products;
  openViewModal?: boolean;
  setOpenViewModal?: (open: boolean) => void;
}

const ModalView = ({
  setOpenViewModal,
  openViewModal,
  selectedRow,
}: ViewActionProps) => {
  // console.log("selectedRow", selectedRow);

  const [productTypes, setProductTypes] = useState();
  const [owner, setOwner] = useState();

  useEffect(() => {
    if (!selectedRow && !selectedRow?.product_type_id && !selectedRow?.user_id)
      return;
    const loadProductTypes = async () => {
      const allPt = await fetchProductTypeById(selectedRow?.product_type_id);
      setProductTypes(allPt);
    };

    const loadUser = async () => {
      const user = await fetchUserById(selectedRow?.user_id);
      setOwner(user);
    };

    loadUser();
    loadProductTypes();
  }, [selectedRow]);

  return (
    <Modal
      title={`View Product`}
      open={openViewModal}
      onCancel={() => setOpenViewModal(false)}
      footer={null}
    >
      {!selectedRow && productTypes ? (
        <Spin />
      ) : (
        <div>
          <div>Name : {selectedRow?.name}</div>
          <div>Description : {selectedRow?.description}</div>
          <div>
            Product Type : <Tag>{productTypes?.name}</Tag>
            <Tag>{productTypes?.category}</Tag>
          </div>
          <div>Owner : {owner}</div>
          <div>Price : {String(selectedRow?.price)}</div>
          <div>Years : {selectedRow?.years}</div>
          <div>SOLD? : {selectedRow?.is_sold ? "SOLD" : "AVAILABLE"}</div>
          <div>CONDITION : {selectedRow?.condition}</div>
        </div>
      )}
    </Modal>
  );
};
export default ModalView;
