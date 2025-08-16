import { getFavoritesByUserId } from "@/api/favorite/favorite";
import { fetchProductByUserId } from "@/api/product/product";
import { fetchDataTable } from "@/shared/DataTable";
import { useDebounce } from "@/shared/Debounce";
import { columns } from "@/shared/TableColumn";
import { useActionState } from "@/store/action";
import { Table } from "antd";
import { useCallback, useEffect, useState } from "react";
import FilterFunction from "./FilterFunction";
import ModalCreateProduct from "./modal-product/Create";
import ModalUpdate from "./modal-product/Update";
import ModalView from "./modal-product/View";

interface TableRenderProps {
  tab: string;
  userId?: string;
}

// TableRender component to render the product table
// It fetches data based on the tab type (product or owner)
// It handles the creation, updating, and viewing of products
// It also manages the favorite status of products
// The component uses various hooks to manage state and effects
// It includes a filter function for the product tab to allow filtering products based on various criteria
// The columns are generated dynamically based on the data and tab type
const TableRender = ({ tab, userId }: TableRenderProps) => {
  // expect to have many const as this is shared component
  // but can be separate
  const [data, setData] = useState([]);
  // inital create modal, is to create new product that why naming not specific
  const [openModal, setOpenModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(false);
  // use for initial render, query from favorite table
  const [favorite, setFavorite] = useState([]);
  const [filter, setFilter] = useState({});
  // use for debouncing filter input avoiding too many API calls
  const debouncedFilter = useDebounce(filter, 300);
  const toggleAction = useActionState((state) => state.toggleAction);
  const setToggleAction = useActionState((state) => state.setToggleAction);
  const debouncedTab = useDebounce(tab, 50);

  const fetchFavorites = useCallback(async () => {
    if (userId && tab === "product") {
      try {
        const favorites = await getFavoritesByUserId(userId);
        setFavorite(favorites);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    }
  }, [userId, tab]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      let result = [];
      if (debouncedTab === "owner" && userId) {
        result = await fetchProductByUserId(userId);
      } else if (debouncedTab === "product" && tab === "product") {
        // tab is pass to identify which table to fetch
        result = await fetchDataTable(debouncedTab, debouncedFilter, userId);
      } else if (debouncedTab === "user" && tab === "user") {
        // to make it strict, if not when click other tab it will called the previous tab also making api call longer
        result = await fetchDataTable(debouncedTab, {}, userId);
      }
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedTab, debouncedFilter, userId, tab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      {/* Toggle action button to show or hide action columns */}
      {/* This is only available for product and owner tabs */}
      {/* For other tabs, it will not render anything */}
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
        locale={{ emptyText: "No data available, please add a product" }}
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
        favorite={favorite}
        setFavorite={setFavorite}
      />
      <ModalUpdate
        tab="product"
        setData={setData}
        selectedRow={selectedRow}
        setOpenModal={setOpenEditModal}
        openModal={openEditModal}
        userId={selectedRow?.user_id}
        isUpdate={true}
      />
    </>
  );
};
export default TableRender;
