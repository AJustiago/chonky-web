import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// Get product details by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const result = await query(`SELECT * FROM products WHERE id = $1;`, [id]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ product: result.rows[0] }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

// Update product details by ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { product_name, product_colorway, product_desc, photo, price, qty } = await req.json();

    await query(
      `UPDATE products SET product_name = $1, product_colorway = $2, product_desc = $3, photo = $4, price = $5, qty = $6 WHERE id = $7;`,
      [product_name, product_colorway, product_desc, photo, price, qty, id]
    );

    return NextResponse.json({ message: 'Product updated successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

// Delete product by ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    await query(`DELETE FROM products WHERE id = $1;`, [id]);

    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
