import { useEffect, useState } from "react";
import { getProductByUserId } from "@/api/product/product";
import { Table } from "antd";
import { columns } from "@/shared/TableColumn";

interface OwnerProductsProps {
  tab: string;
  userId: string;
}

const OwnerProducts = ({ tab, userId }: OwnerProductsProps) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProductByUserId(userId);
        setProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [userId]);

  if (!products.length) {
    return <div>No products found.</div>;
  }

  return (
    <Table
      dataSource={products}
      rowKey="id"
      columns={columns(products, tab)}
      pagination={{ pageSize: 10 }}
      loading={!products.length}
      bordered
    />
  );
};
export default OwnerProducts;
