"use client";

import AdminLayout from "@/components/admin/adminLayout";
import React, { useEffect, useState, Suspense } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import MyBreadcrumbs from "@/components/admin/breadcrumbs";
import ProductForm from "./product-form";
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Product } from "@/types/product";
import { getProductsById, createProduct, updateProduct } from "@/services/productService";
import { useQuery } from "@tanstack/react-query";
import '@/styles/embla.css'
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, { message: "Product Name must be at least 2 characters."}),
  description: z.string().min(10, { message: "Product Description must be at least 10 characters."}),
  colorways: z.array(z.string()).min(1, { message: "Product Colorway must be at least 1."}),
  quantity: z.coerce.number().int().positive({ message: "Product Quantity must be positive."}),
  price: z.coerce.number().int().positive({message : "Product Price must be postive."}),
  images: z.array(z.string()).min(1, {message: "Product Image must be at least 1."})
})

type FormValues = z.infer<typeof formSchema>;

export default function DetailProductPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DetailProductContent />
    </Suspense>
  );
}

function DetailProductContent() {
  const router = useRouter();

  const { id } = useParams<{ id: string }>();

  const isNew = !id || id === "new";
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => (isNew ? null : getProductsById(id)),
    enabled: !isNew,
  });

  const useFormValues = (product?: Product | null): FormValues => {
    return formSchema.parse({
      name: product?.name || "",
      description: product?.description || "",
      colorways: product?.colorways || [],
      quantity: product?.quantity || 0,
      price: product?.price || 0,
      images: product?.images || [],
    });
  };

  const initialValues = useFormValues(product);

  const handleAddProduct = async (productData: FormValues) => {
    try {
      setIsSubmitting(true);
      await createProduct(productData);
      toast.success("Product added successfully", {
        description: `${productData.name} has been added to your inventory.`,
      });
      router.push("/admin/product/order/stock");
    } catch (error: any) {
      toast.error("Failed to add product", {
        description: error.message || "An error occurred.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateProduct = async (productData: FormValues) => {
    try {
      setIsSubmitting(true);
      await updateProduct(id, productData);
      toast.success("Product updated successfully", {
        description: `${productData.name} has been updated.`,
      });
      router.push("/admin/product/order/stock");
    } catch (error: any) {
      toast.error("Failed to update product", {
        description: error.message || "An error occurred.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (values: FormValues) =>  {
    if (isNew) {
      handleAddProduct(values);
    } else {
      handleUpdateProduct(values);
    }
  };

  return (
    <AdminLayout>
      <div className="container">
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
            initialValues={initialValues} 
            onSubmit={handleSubmit} 
            isSubmitting={isSubmitting} />
          </div>          
      </div>
    </AdminLayout>
  );
}
