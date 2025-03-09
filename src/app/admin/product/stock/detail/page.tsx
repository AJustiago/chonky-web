"use client";

import AdminLayout from "@/components/admin/adminLayout";
import React from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import MyBreadcrumbs from "@/components/admin/breadcrumbs";
import ProductForm, { ProductData } from "./product-form";
import { toast } from 'sonner';

import '@/styles/embla.css'

export default function DetailProductPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DetailProductContent />
    </Suspense>
  );
}

function DetailProductContent() {
  const params = useParams();
  const searchParams = useSearchParams();

  const id = params?.id as string || searchParams.get("id");
  
  const [products, setProducts] = useState<ProductData[]>([]);

  const handleAddProduct = (productData: ProductData) => {
    console.log('Product added:', productData);
    
    setProducts([...products, productData]);
    
    toast.success('Product added successfully', {
      description: `${productData.name} has been added to your inventory.`,
    });
  };
  return (
    <AdminLayout>
      <div className="container mx-auto p-4">
        <MyBreadcrumbs user={"Admin"} menu={["Product Stock", id ? "Edit Product" : "Add Product"]} link={["/admin/product/stock"]}/>
        <h1 className="text-2xl font-bold my-6">{id ? "Edit Product" : "Add Product"}</h1>
          <div className="animate-slide-up">
            <ProductForm onSubmit={handleAddProduct} />
          </div>          
      </div>
    </AdminLayout>
  );
}
