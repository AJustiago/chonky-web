"use client";

import AdminLayout from '@/components/admin/adminLayout';
import React, { useEffect, useState } from 'react';
import { ProductTable } from "./columns";
import { DataTable } from "./data-table";
import { Product } from "@/types/product";
import MyBreadcrumbs from '@/components/admin/breadcrumbs';

// Function to fetch data
async function getData(): Promise<Product[]> {
  return [
    { id: "A001", name: "Apple Iphone", colorways: ["blue", "black", "purple"], description: "this is an electronics device", images: ["/AA.jpeg"], price: 50000, quantity: 12, functionEnabled: false },
    { id: "A002", name: "Apple Watch", colorways: ["midnight", "sand", "sky"], description: "this is an electronics device", images: ["/AA.jpeg","/AA.jpeg","/AA.jpeg","/AA.jpeg"], price: 500000, quantity: 10, functionEnabled: false },
    { id: "A003", name: "Samsung S24", colorways: ["white", "ash", "dust"], description: "this is an electronics device", images: ["/AA.jpeg"], price: 5000000, quantity: 1, functionEnabled: false },
    { id: "A004", name: "Oppo Reno X", colorways: ["grey", "red", "pink"], description: "this is an electronics device", images: ["/AA.jpeg"], price: 5000, quantity: 9, functionEnabled: false },
  ];
}

export default function FCFSProductPage() {
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    getData().then(setData);
  }, []);

  const columns = ProductTable();

  return (
    <AdminLayout>
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-between mb-4">
          <MyBreadcrumbs user="Admin" menu={["Product Stock"]} link={[]} />
        </div>
        <DataTable columns={columns} data={data} />
      </div>
    </AdminLayout>
  );
}
