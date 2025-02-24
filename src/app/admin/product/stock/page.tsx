import AdminLayout from '@/components/admin/adminLayout';
import React from 'react';
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { Product } from "@/schemas/product.schema";
import MyBreadcrumbs from '@/components/admin/breadcrumbs';

async function getData(): Promise<Product[]>{
  return [
    { id: "A001", productName: "Apple Iphone", productColorway:["blue", "black", "purple"], productDesc: "this is electronics device", photo: "/AA.jpeg", price: 50000, qty: 12, functionEnabled: false},
    { id: "A002", productName: "Apple Watch", productColorway:["midnight", "sand", "sky"], productDesc: "this is electronics device", photo: "/AA.jpeg", price: 500000, qty: 10, functionEnabled: false},
    { id: "A003", productName: "Samsung S24", productColorway:["white", "ash", "dust"], productDesc: "this is electronics device", photo: "/AA.jpeg", price: 5000000, qty: 1, functionEnabled: false},
    { id: "A004", productName: "Oppo Reno X", productColorway:["grey", "red", "pink"], productDesc: "this is electronics device", photo: "/AA.jpeg", price: 5000, qty: 9, functionEnabled: false},
    { id: "A001", productName: "Apple Iphone", productColorway:["blue", "black", "purple"], productDesc: "this is electronics device", photo: "/AA.jpeg", price: 50000, qty: 12 , functionEnabled: false},
    { id: "A002", productName: "Apple Watch", productColorway:["midnight", "sand", "sky"], productDesc: "this is electronics device", photo: "/AA.jpeg", price: 500000, qty: 10, functionEnabled: false},
    { id: "A003", productName: "Samsung S24", productColorway:["white", "ash", "dust"], productDesc: "this is electronics device", photo: "/AA.jpeg", price: 5000000, qty: 1, functionEnabled: false},
    { id: "A004", productName: "Oppo Reno X", productColorway:["grey", "red", "pink"], productDesc: "this is electronics device", photo: "/AA.jpeg", price: 5000, qty: 9, functionEnabled: false},
    { id: "A001", productName: "Apple Iphone", productColorway:["blue", "black", "purple"], productDesc: "this is electronics device", photo: "/AA.jpeg", price: 50000, qty: 12 , functionEnabled: false},
    { id: "A002", productName: "Apple Watch", productColorway:["midnight", "sand", "sky"], productDesc: "this is electronics device", photo: "/AA.jpeg", price: 500000, qty: 10, functionEnabled: false},
    { id: "A003", productName: "Samsung S24", productColorway:["white", "ash", "dust"], productDesc: "this is electronics device", photo: "/AA.jpeg", price: 5000000, qty: 1, functionEnabled: false},
    { id: "A004", productName: "Oppo Reno X", productColorway:["grey", "red", "pink"], productDesc: "this is electronics device", photo: "/AA.jpeg", price: 5000, qty: 9, functionEnabled: false},
    { id: "A001", productName: "Apple Iphone", productColorway:["blue", "black", "purple"], productDesc: "this is electronics device", photo: "/AA.jpeg", price: 50000, qty: 12 , functionEnabled: false},
    { id: "A002", productName: "Apple Watch", productColorway:["midnight", "sand", "sky"], productDesc: "this is electronics device", photo: "/AA.jpeg", price: 500000, qty: 10, functionEnabled: false},
    { id: "A003", productName: "Samsung S24", productColorway:["white", "ash", "dust"], productDesc: "this is electronics device", photo: "/AA.jpeg", price: 5000000, qty: 1, functionEnabled: false},
    { id: "A004", productName: "Oppo Reno X", productColorway:["grey", "red", "pink"], productDesc: "this is electronics device", photo: "/AA.jpeg", price: 5000, qty: 9, functionEnabled: false},
    { id: "A001", productName: "Apple Iphone", productColorway:["blue", "black", "purple"], productDesc: "this is electronics device", photo: "/AA.jpeg", price: 50000, qty: 12 , functionEnabled: false},
    { id: "A002", productName: "Apple Watch", productColorway:["midnight", "sand", "sky"], productDesc: "this is electronics device", photo: "/AA.jpeg", price: 500000, qty: 10, functionEnabled: false},
    { id: "A003", productName: "Samsung S24", productColorway:["white", "ash", "dust"], productDesc: "this is electronics device", photo: "/AA.jpeg", price: 5000000, qty: 1, functionEnabled: false},
    { id: "A004", productName: "Oppo Reno X", productColorway:["grey", "red", "pink"], productDesc: "this is electronics device", photo: "/AA.jpeg", price: 5000, qty: 9, functionEnabled: false},
    { id: "A001", productName: "Apple Iphone", productColorway:["blue", "black", "purple"], productDesc: "this is electronics device", photo: "/AA.jpeg", price: 50000, qty: 12 , functionEnabled: false},
    { id: "A002", productName: "Apple Watch", productColorway:["midnight", "sand", "sky"], productDesc: "this is electronics device", photo: "/AA.jpeg", price: 500000, qty: 10, functionEnabled: false},
    { id: "A003", productName: "Samsung S24", productColorway:["white", "ash", "dust"], productDesc: "this is electronics device", photo: "/AA.jpeg", price: 5000000, qty: 1, functionEnabled: false},
    { id: "A004", productName: "Oppo Reno X", productColorway:["grey", "red", "pink"], productDesc: "this is electronics device", photo: "/AA.jpeg", price: 5000, qty: 9, functionEnabled: false},
    { id: "A001", productName: "Apple Iphone", productColorway:["blue", "black", "purple"], productDesc: "this is electronics device", photo: "/AA.jpeg", price: 50000, qty: 12 , functionEnabled: false},
    { id: "A002", productName: "Apple Watch", productColorway:["midnight", "sand", "sky"], productDesc: "this is electronics device", photo: "/AA.jpeg", price: 500000, qty: 10, functionEnabled: false},
    { id: "A003", productName: "Samsung S24", productColorway:["white", "ash", "dust"], productDesc: "this is electronics device", photo: "/AA.jpeg", price: 5000000, qty: 1, functionEnabled: false},
    { id: "A004", productName: "Oppo Reno X", productColorway:["grey", "red", "pink"], productDesc: "this is electronics device", photo: "/AA.jpeg", price: 5000, qty: 9, functionEnabled: false},
    { id: "A001", productName: "Apple Iphone", productColorway:["blue", "black", "purple"], productDesc: "this is electronics device", photo: "/AA.jpeg", price: 50000, qty: 12 , functionEnabled: false},
    { id: "A002", productName: "Apple Watch", productColorway:[ "midnight", "sand", "sky"], productDesc: "this is electronics device", photo: "/AA.jpeg", price: 500000, qty: 10, functionEnabled: false},
    { id: "A003", productName: "Samsung S24", productColorway:[ "white"], productDesc: "this is electronics device", photo: "/AA.jpeg", price: 5000000, qty: 1, functionEnabled: false},
    { id: "A004", productName: "Oppo Reno X", productColorway:["grey", "red", "pink"], productDesc: "this is electronics device", photo: "/AA.jpeg", price: 5000, qty: 9, functionEnabled: false},
  ];
}

export default async function FCFSProductPage() {
  const data= await getData()

  return (
    <AdminLayout>
      <div className="container mx-auto py-10lho">
        <MyBreadcrumbs user={"Admin"} menu={["Product Stock"]} link={[]} />
        <DataTable columns={columns} data={data} />
      </div>
    </AdminLayout>
  )
}