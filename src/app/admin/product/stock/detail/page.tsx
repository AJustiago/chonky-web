"use client";

import AdminLayout from "@/components/admin/adminLayout";
import React, { useEffect, useState, Suspense } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import MyBreadcrumbs from "@/components/admin/breadcrumbs";
import ProductForm, { ProductData } from "./product-form";
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

import '@/styles/embla.css'

export default function DetailProductPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DetailProductContent />
    </Suspense>
  );
}

function DetailProductContent() {
  const router = useRouter();

  const params = useParams();
  const searchParams = useSearchParams();

  const id = params?.id as string || searchParams.get("id");

  const [productData, setProductData] = useState<ProductData | null>(null);

  useEffect(() => {
    const id = searchParams.get("id");

    if (id) {
      setProductData({
        id,
        name: searchParams.get("productName") || "",
        description: decodeURIComponent(searchParams.get("productDesc") || ""),
        colorways: decodeURIComponent(searchParams.get("productColorway") || "").split(","),
        quantity: parseInt(searchParams.get("qty") || "1", 10),
        price: parseFloat(searchParams.get("price") || "0"),
        images: decodeURIComponent(searchParams.get("photo") || "").split(",")
      });
    }
  }, [searchParams]);

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
        <div className="flex items-center my-6 space-x-4">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="mt-0.5">Back</span>
          </Button>
          <h1 className="text-2xl font-bold">{id ? "Edit Product" : "Add Product"}</h1>
        </div>
          <div className="animate-slide-up">
            <ProductForm 
              initialValues={id ? productData : null} 
              onSubmit={handleAddProduct} 
            />
          </div>          
      </div>
    </AdminLayout>
  );
}
