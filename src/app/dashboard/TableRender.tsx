import { getProductByUserId } from "@/api/product/product";
import { fetchDataTable } from "@/shared/DataTable";
import { columns } from "@/shared/TableColumn";
import { useActionState } from "@/store/action";
import { Button, Table } from "antd";
import { use, useCallback, useEffect, useMemo, useState } from "react";
import FilterFunction from "./FilterFunction";
import ModalCreateProduct from "./modal-product/Create";
import ModalUpdate from "./modal-product/Update";
import ModalView from "./modal-product/View";
import { getFavoritesByUserId } from "@/api/favorite/favorite";
import { debounce } from "lodash";
import { useDebounce } from "@/shared/Debounce";

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
  const [favorite, setFavorite] = useState([]);
  const [filter, setFilter] = useState({});
  const debouncedFilter = useDebounce(filter, 300);
  const toggleAction = useActionState((state) => state.toggleAction);
  const setToggleAction = useActionState((state) => state.setToggleAction);
  const debouncedTab = useDebounce(tab, 300);
  const [prevTab, setPrevTab] = useState(tab);

  const fetchFavorites = useCallback(async () => {
    if (userId || tab === "product") {
      try {
        const favorites = await getFavoritesByUserId(userId);
        setFavorite(favorites);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    }
  }, [userId, tab]);

  useEffect(() => {
    setFilter({});
  }, [tab]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const fetchData = useCallback(async () => {
    setLoading(true);

    if (prevTab !== debouncedTab) {
      setData([]);
      setPrevTab(debouncedTab);
    }

    try {
      let result = [];
      if (debouncedTab === "owner" && userId) {
        result = await getProductByUserId(userId);
      } else {
        result = await fetchDataTable(debouncedTab, debouncedFilter, userId);
      }
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedTab, debouncedFilter, userId, prevTab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
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
          {tab === "product" && (
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
          setSelectedRow,
          favorite,
          userId,
          setData,
          setFavorite
        )}
        onRow={(record) => {
          if (tab === "product" || tab === "owner") {
            return {
              onClick: () => {
                setSelectedRow(record);
                setOpenViewModal(true);
              },
            };
          }
        }}
      />
      <ModalView
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
