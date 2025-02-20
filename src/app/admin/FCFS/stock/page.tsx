import AdminLayout from '@/components/admin/adminLayout';
import React from 'react';
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { productSchema, Product } from "@/schemas/product.schema";

async function getData(): Promise<Product[]>{
  return [
    { id: "A001", productName: "Apple Iphone", productDetail: "blue", photo: "/AA.jpeg", price: 50000, qty: 12, functionEnabled: false},
    { id: "A002", productName: "Apple Watch", productDetail: "midnight", photo: "/AA.jpeg", price: 500000, qty: 10, functionEnabled: false},
    { id: "A003", productName: "Samsung S24", productDetail: "white", photo: "/AA.jpeg", price: 5000000, qty: 1, functionEnabled: false},
    { id: "A004", productName: "Oppo Reno X", productDetail:"grey", photo: "/AA.jpeg", price: 5000, qty: 9, functionEnabled: false},
    { id: "A001", productName: "Apple Iphone", productDetail: "blue", photo: "/AA.jpeg", price: 50000, qty: 12 , functionEnabled: false},
    { id: "A002", productName: "Apple Watch", productDetail: "midnight", photo: "/AA.jpeg", price: 500000, qty: 10, functionEnabled: false},
    { id: "A003", productName: "Samsung S24", productDetail: "white", photo: "/AA.jpeg", price: 5000000, qty: 1, functionEnabled: false},
    { id: "A004", productName: "Oppo Reno X", productDetail:"grey", photo: "/AA.jpeg", price: 5000, qty: 9, functionEnabled: false},
    { id: "A001", productName: "Apple Iphone", productDetail: "blue", photo: "/AA.jpeg", price: 50000, qty: 12 , functionEnabled: false},
    { id: "A002", productName: "Apple Watch", productDetail: "midnight", photo: "/AA.jpeg", price: 500000, qty: 10, functionEnabled: false},
    { id: "A003", productName: "Samsung S24", productDetail: "white", photo: "/AA.jpeg", price: 5000000, qty: 1, functionEnabled: false},
    { id: "A004", productName: "Oppo Reno X", productDetail:"grey", photo: "/AA.jpeg", price: 5000, qty: 9, functionEnabled: false},
    { id: "A001", productName: "Apple Iphone", productDetail: "blue", photo: "/AA.jpeg", price: 50000, qty: 12 , functionEnabled: false},
    { id: "A002", productName: "Apple Watch", productDetail: "midnight", photo: "/AA.jpeg", price: 500000, qty: 10, functionEnabled: false},
    { id: "A003", productName: "Samsung S24", productDetail: "white", photo: "/AA.jpeg", price: 5000000, qty: 1, functionEnabled: false},
    { id: "A004", productName: "Oppo Reno X", productDetail:"grey", photo: "/AA.jpeg", price: 5000, qty: 9, functionEnabled: false},
    { id: "A001", productName: "Apple Iphone", productDetail: "blue", photo: "/AA.jpeg", price: 50000, qty: 12 , functionEnabled: false},
    { id: "A002", productName: "Apple Watch", productDetail: "midnight", photo: "/AA.jpeg", price: 500000, qty: 10, functionEnabled: false},
    { id: "A003", productName: "Samsung S24", productDetail: "white", photo: "/AA.jpeg", price: 5000000, qty: 1, functionEnabled: false},
    { id: "A004", productName: "Oppo Reno X", productDetail:"grey", photo: "/AA.jpeg", price: 5000, qty: 9, functionEnabled: false},
    { id: "A001", productName: "Apple Iphone", productDetail: "blue", photo: "/AA.jpeg", price: 50000, qty: 12 , functionEnabled: false},
    { id: "A002", productName: "Apple Watch", productDetail: "midnight", photo: "/AA.jpeg", price: 500000, qty: 10, functionEnabled: false},
    { id: "A003", productName: "Samsung S24", productDetail: "white", photo: "/AA.jpeg", price: 5000000, qty: 1, functionEnabled: false},
    { id: "A004", productName: "Oppo Reno X", productDetail:"grey", photo: "/AA.jpeg", price: 5000, qty: 9, functionEnabled: false},
    { id: "A001", productName: "Apple Iphone", productDetail: "blue", photo: "/AA.jpeg", price: 50000, qty: 12 , functionEnabled: false},
    { id: "A002", productName: "Apple Watch", productDetail: "midnight", photo: "/AA.jpeg", price: 500000, qty: 10, functionEnabled: false},
    { id: "A003", productName: "Samsung S24", productDetail: "white", photo: "/AA.jpeg", price: 5000000, qty: 1, functionEnabled: false},
    { id: "A004", productName: "Oppo Reno X", productDetail:"grey", photo: "/AA.jpeg", price: 5000, qty: 9, functionEnabled: false},
    { id: "A001", productName: "Apple Iphone", productDetail: "blue", photo: "/AA.jpeg", price: 50000, qty: 12 , functionEnabled: false},
    { id: "A002", productName: "Apple Watch", productDetail: "midnight", photo: "/AA.jpeg", price: 500000, qty: 10, functionEnabled: false},
    { id: "A003", productName: "Samsung S24", productDetail: "white", photo: "/AA.jpeg", price: 5000000, qty: 1, functionEnabled: false},
    { id: "A004", productName: "Oppo Reno X", productDetail:"grey", photo: "/AA.jpeg", price: 5000, qty: 9, functionEnabled: false},
  ];
}

export default async function FCFSStockPage() {
  const data= await getData()

  return (
    <AdminLayout>
      <div className="container mx-auto py-10lho">
        <DataTable columns={columns} data={data} />
      </div>
    </AdminLayout>
  )
}