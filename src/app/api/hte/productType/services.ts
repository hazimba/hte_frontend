import { sql } from "@/app/api/lib/db";

export async function getProductTypeColumn() {
  const productTypes = await sql`
    SELECT id, name FROM product_types ORDER BY id DESC;
  `;
  return productTypes.map((type) => ({
    label: type.name,
    value: type.id,
  }));
}
