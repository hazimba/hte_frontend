import { NextResponse } from "next/server";
import { sql } from "@/app/api/lib/db";

export async function getProducts() {
  try {
    const users = await sql`SELECT * FROM users ORDER BY id DESC;`;
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
