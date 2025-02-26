import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    // Check if the table exists
    const checkTableQuery = `
      SELECT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'products'
      );
    `;

    const tableExistsResult = await query(checkTableQuery);
    const tableExists = tableExistsResult?.rows?.[0]?.exists;

    if (!tableExists) {
      // Create the table if it does not exist
      const createTableQuery = `
        CREATE TABLE products (
          id SERIAL PRIMARY KEY,
          product_name TEXT NOT NULL,
          product_colorway TEXT NOT NULL,
          product_desc TEXT NOT NULL,
          photo TEXT NOT NULL,
          price NUMERIC NOT NULL,
          qty INT NOT NULL
        );
      `;
      await query(createTableQuery);
      console.log("Table Products created.");
    } else {
      console.log("Table Products already exists.");
    }

    // Check if table is empty
    const checkCountQuery = `SELECT COUNT(*) AS count FROM products;`;
    const countResult = await query(checkCountQuery);
    const productCount = parseInt(countResult?.rows?.[0]?.count, 10);

    if (productCount === 0) {
      // Insert default data only if table is empty
      const insertDataQuery = `
        INSERT INTO products (product_name, product_colorway, product_desc, photo, price, qty)
        VALUES 
        ('Nike Air Force 1', 'White, Black, Blue Suede', 'Classic sneaker', '/AA.jpeg', 1200000.00, 50),
        ('Adidas Ultraboost', 'Triple Black, Gold, White', 'Comfort running shoes', '/AA.jpeg', 1800000.00, 30);
      `;

      await query(insertDataQuery);
      console.log("Data Products inserted successfully.");
    } else {
      console.log("Table Products already has data. Skipping insert.");
    }

    return NextResponse.json(
      { message: "Success: Table verified and data managed." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error executing queries:", error);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "An unknown error occurred" },
      { status: 500 }
    );
  }
}

// Handle unsupported GET requests
export function GET() {
  return NextResponse.json(
    { message: "Only POST requests allowed" },
    { status: 405 }
  );
}
