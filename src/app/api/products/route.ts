import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// Get all products
export async function GET() {
  try {
    const result = await query(`SELECT * FROM products;`);
    return NextResponse.json({ products: result.rows }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { product_name, product_colorway, product_desc, photo, price, qty } = body;

    if (!product_name || !price || !qty) {
      return NextResponse.json(
        { error: "Missing required fields: product_name, price, or qty" },
        { status: 400 }
      );
    }

    const colorwayString = Array.isArray(product_colorway)
      ? product_colorway.join(",")
      : product_colorway || "";
    
    const photoString = Array.isArray(photo) ? photo.join(",") : photo || "";

    const insertQuery = `
      INSERT INTO products (product_name, product_colorway, product_desc, photo, price, qty)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const values = [product_name, colorwayString, product_desc, photoString, price, qty];
    const result = await query(insertQuery, values);

    return NextResponse.json(
      { message: "Product added successfully", product: result.rows[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  }
}
