"use client";

import AdminLayout from '@/components/admin/adminLayout';
import React, { useEffect, useState } from 'react';
import { ProductTable } from "./columns";
import { DataTable } from "./data-table";
import { Product } from "@/schemas/product.schema";
import MyBreadcrumbs from '@/components/admin/breadcrumbs';

// Function to fetch data from API
async function getData(): Promise<Product[]> {
  try {
    const response = await fetch("/api/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default function ProductPage() {
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    getData().then(setData);
  }, []);

  const columns = ProductTable();
  console.log(data)
  
  return (
    <AdminLayout>
      <div className="container mx-auto py-10">
        <MyBreadcrumbs user="Admin" menu={["Product Stock"]} link={[]} />
        <h1 className="text-2xl font-bold my-6">Product</h1>
        {data.length === 0 ? (
          <p className="text-center text-gray-500">No data available</p>
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </div>
    </AdminLayout>
  );
}
