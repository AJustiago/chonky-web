"use client";

import AdminLayout from '@/components/admin/adminLayout';
import React from 'react';
import { ProductTable } from "./columns";
import { DataTable } from "./data-table";
import { Product } from "@/types/product";
import MyBreadcrumbs from '@/components/admin/breadcrumbs';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { getProducts } from '@/services/productService';

const ProductPage: React.FC = () => {
  const queryClient = useQueryClient();
  
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const refreshProducts = () => {
    queryClient.invalidateQueries({ queryKey: ["products"] });
  };

  const columns = ProductTable();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <MyBreadcrumbs user="Admin" menu={["Product Stock"]} link={[]} />
          <h1 className="text-2xl font-bold tracking-tight mt-5">Product Stock</h1>
          <p className="text-muted-foreground">Manage your product.</p>
        </div>
      </div>

      {isLoading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p className="text-red-500">Error loading products: {(error as Error).message}</p>
      ) : (
        <DataTable columns={columns} data={products ?? []} />
      )}
    </div>
  );
};

export default function ProductPageWrapper() {
  return (
    <AdminLayout>
      <ProductPage />
    </AdminLayout>
  );
}
