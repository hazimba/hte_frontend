"use client";
import { Products } from "@/types/types";
import { Button, Modal, Spin, Tag } from "antd";
import { fetchProductTypeById } from "@/api/product-type/product-type";
import { fetchUserById } from "@/api/user/user";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import ToggleFavorite from "@/shared/ToggleFavorite";
import { url } from "@/config/url";
import axios from "axios";

interface ViewActionProps {
  refetch?: () => void;
  selectedRow?: Products;
  openViewModal?: boolean;
  setOpenViewModal?: (open: boolean) => void;
  favorite?: { product_id: string; user_id: string }[];
  setFavorite?: Dispatch<
    SetStateAction<{ product_id: string; user_id: string }[]>
  >;
}

// ModalView component to display product details
// It fetches product type and user details based on the selected row
// and allows toggling favorite status
const ModalView = ({
  refetch,
  setOpenViewModal,
  openViewModal,
  selectedRow,
  favorite,
  setFavorite,
}: ViewActionProps) => {
  const [productTypes, setProductTypes] = useState<{
    name: string;
    category: string;
  }>();
  const [owner, setOwner] = useState();

  useEffect(() => {
    if (!selectedRow && !selectedRow?.product_type_id && !selectedRow?.user_id)
      return;

    // product type and user are store as foreign key in product table
    // so need to fetch product type and user by id
    const getProductType = async () => {
      const pt = await fetchProductTypeById(selectedRow?.product_type_id);
      setProductTypes(pt);
    };

    const getUser = async () => {
      const user = await fetchUserById(selectedRow?.user_id);
      setOwner(user);
    };

    getUser();
    getProductType();
  }, [selectedRow]);

  const purchaseProduct = async (selectedRow) => {
    console.log("selectedRow", selectedRow);

    const patchData = {
      ...selectedRow,
      is_sold: true,
    };

    try {
      const response = await axios.patch(
        `${url}/product/${selectedRow?.id}`,
        patchData
      );
      if (response.status === 200) {
        refetch();
        setOpenViewModal(false);
      }
    } catch (error) {
      console.error("Error purchasing product:", error);
    }
  };

  return (
    <Modal
      title={`View Product`}
      open={openViewModal}
      onCancel={() => setOpenViewModal(false)}
      footer={null}
    >
      {!selectedRow && productTypes && owner ? (
        <Spin />
      ) : (
        <div className="flex flex-col gap-4">
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
          <div className="flex justify-between gap-2 items-center">
            <Button
              disabled={!!selectedRow?.is_sold}
              onClick={() => purchaseProduct(selectedRow)}
            >
              {selectedRow?.is_sold ? "Already Sold" : "Purchase"}
            </Button>
            <div className="flex gap-2">
              Add Fav
              <ToggleFavorite
                userId={selectedRow?.user_id}
                isView={true}
                record={selectedRow}
                favorite={favorite}
                setFavorite={setFavorite}
              />
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};
export default ModalView;
