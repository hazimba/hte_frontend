import { getProductByUserId } from "@/api/product/product";
import { fetchDataTable } from "@/shared/DataTable";
import { columns } from "@/shared/TableColumn";
import { useActionState } from "@/store/action";
import { Button, Table } from "antd";
import { useCallback, useEffect, useState } from "react";
import FilterFunction from "./FilterFunction";
import ModalCreateProduct from "./modal-product/Create";
import ModalUpdate from "./modal-product/Update";
import ModalView from "./modal-product/View";

interface TableRenderProps {
  tab: string;
  userId?: string;
}

const TableRender = ({ tab, userId }: TableRenderProps) => {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({
    name: "",
    condition: null,
    product_type_id: [],
    // favorite: false,
  });

  const toggleAction = useActionState((state) => state.toggleAction);
  const setToggleAction = useActionState((state) => state.setToggleAction);
  console.log("tab:", tab);
  const fetchData = useCallback(async () => {
    setLoading(true);
    setData([]);

    try {
      let result = [];
      if (tab === "owner" && userId) {
        result = await getProductByUserId(userId);
      } else {
        result = await fetchDataTable(tab, filter);
      }
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [tab, userId, setData, filter]);

  useEffect(() => {
    fetchData();
  }, [tab, userId, fetchData, filter]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Button onClick={() => refetch()}>Refresh</Button>
      {tab === "product" || tab === "owner" ? (
        <div
          className="flex justify-end cursor-pointer"
          onClick={() => setToggleAction()}
        >
          {!toggleAction ? "Show Action" : "Hide Action"}
        </div>
      ) : (
        <div className="text-transparent">1</div>
      )}
      {!toggleAction && (
        <span className="mr-4 flex justify-between">
          {(tab === "product" || tab === "owner") && (
            <FilterFunction onFilterChange={(values) => setFilter(values)} />
          )}
          {tab === "owner" && (
            <ModalCreateProduct
              tab={tab === "owner" ? "product" : tab}
              setData={setData}
              setOpenModal={setOpenModal}
              openModal={openModal}
              userId={userId}
            />
          )}
        </span>
      )}
      {data.length > 0 ? (
        <Table
          key={tab}
          loading={loading}
          rowKey={"uuid"}
          pagination={{ pageSize: toggleAction ? 8 : 5 }}
          scroll={{ y: "calc(100vh - 200px)" }}
          dataSource={data}
          columns={columns(
            data,
            tab,
            refetch,
            setOpenEditModal,
            setSelectedRow
          )}
          onRow={(record) => ({
            onClick: () => {
              setOpenViewModal(true);
              setSelectedRow(record);
            },
          })}
        />
      ) : (
        <div className="flex justify-center items-center">
          <div>Data not available/ not found</div>
        </div>
      )}
      <ModalView
        tab={tab}
        setData={setData}
        selectedRow={selectedRow}
        openViewModal={openViewModal}
        setOpenViewModal={setOpenViewModal}
      />
      <ModalUpdate
        tab="product"
        setData={setData}
        selectedRow={selectedRow}
        setOpenModal={setOpenEditModal}
        openModal={openEditModal}
        userId={selectedRow?.user_id}
        isEdit={true}
      />
    </>
  );
};
export default TableRender;
