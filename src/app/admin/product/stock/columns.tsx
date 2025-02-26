"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/schemas/product.schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import DialogDelete from "@/components/global/dialog-delete";
import { useState } from "react";

export const ProductTable = () => {
  const router = useRouter();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    console.log(deleteId);
    if (deleteId !== null) {
      console.log("Deleted item with ID:", deleteId);
      toast("Delete Success", {
        description: "Product Data Has Been Deleted",
      });
      setIsDeleteOpen(false);
    }
  };

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "product_name",
      header: ({ column }) => (
        <div
          className="cursor-pointer flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
    },
    {
      accessorKey: "product_colorway",
      header: ({ column }) => (
        <div
          className="cursor-pointer flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Colorway
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
    },
    {
      accessorKey: "photo",
      header: "Product Photo",
      cell: ({ row }) => {
        const src = row.getValue("photo");
        return (
          <div className="">
            <img
              src={src as string}
              alt="Product"
              className="w-16 h-16 object-cover rounded-md"
            />
          </div>
        );
      },
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <div
          className="cursor-pointer flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("price"));
        const formatted = new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(amount);

        return <div className="font-medium">{formatted}</div>;
      },
      enableSorting: true,
    },
    {
      accessorKey: "qty",
      header: ({ column }) => (
        <div
          className="cursor-pointer flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Qty
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const data = row.original;
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                const queryParams = new URLSearchParams({
                  id: String(data.id) || "",
                  product_name: data.product_name,
                  product_colorway: data.product_colorway, 
                  product_desc: data.product_desc || "",
                  photo: data.photo,
                  price: String(data.price),
                  qty: String(data.qty),
                }).toString();                
                
                router.push(`/admin/product/stock/detail/?${queryParams}`);
              }}
            >
              <Pencil className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="icon" onClick={() => handleDelete(data.id || 0)}>
              <Trash2 className="h-4 w-4" />
            </Button>

            <DialogDelete
              isOpen={isDeleteOpen}
              onClose={() => setIsDeleteOpen(false)}
              onConfirm={confirmDelete}
            />
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
  ];

  return columns;
};
