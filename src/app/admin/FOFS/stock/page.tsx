import AdminLayout from '@/components/admin/adminLayout';
import React from 'react';
import { Data, columns} from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Data[]>{
  return [
    { id: "A001", productName: "A", photo: "/A.jpg", price: 50000, qty: 12 },
    { id: "A002", productName: "B", photo: "/B.jpg", price: 500000, qty: 10},
    { id: "A003", productName: "C", photo: "/C.jpg", price: 5000000, qty: 1},
    { id: "A004", productName: "D", photo: "/D.jpg", price: 5000, qty: 9},
  ];
}

export default async function FOFSStockPage() {
  const data= await getData()

  return (
    <AdminLayout>
      <div className="container mx-auto py-10lho">
        <DataTable columns={columns} data={data} />
      </div>
    </AdminLayout>
  )
}