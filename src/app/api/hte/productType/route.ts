import { NextResponse } from "next/server";
import { getProductTypeColumn } from "./services";

export async function GET() {
  try {
    const data = await getProductTypeColumn();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching product types:", error);
    return NextResponse.json(
      { error: "Failed to fetch product types" },
      { status: 500 }
    );
  }
}
