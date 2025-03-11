"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/schemas/product.schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import DialogDelete from "@/components/global/dialog-delete";
import { useState } from "react";
import Image from "next/image";

export const ProductTable = () => {
  const router = useRouter();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | "">("");

  const handleDelete = (id: string) => {
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
      accessorKey: "name",
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
      accessorKey: "colorways",
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
      accessorKey: "images",
      header: "Product images",
      cell: ({ row }) => {
        const imagess = row.getValue("images");
        const src = Array.isArray(imagess) ? imagess[0] : "";
        return (
          <Image
            src={src as string}
            alt="Product"
            width={64} // Equivalent to w-16 in Tailwind
            height={64} // Equivalent to h-16 in Tailwind
            className="object-cover rounded-md"
          />
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
      accessorKey: "quantity",
      header: ({ column }) => (
        <div
          className="cursor-pointer flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product quantity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const data = row.original;
        console.log(data.images)
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                const queryParams = new URLSearchParams({
                  id: data.id || "",
                  name: data.name,
                  colorways: data.colorways
                    ? data.colorways.join(",")
                    : "",
                  description: data.description || "",
                  images: data.images
                    ? data.images.join(",")
                    : "",
                  price: String(data.price),
                  quantity: String(data.quantity),
                }).toString();

                router.push(`/admin/product/stock/detail/?${queryParams}`);
              }}
            >
              <Pencil className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="icon" onClick={() => handleDelete(data.id!)}>
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
