"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react";
// import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Product } from "@/schemas/product.schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import DialogDelete from "@/components/global/dialog-delete";

export const columns: ColumnDef<Product>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //     checked={
  //       table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       />
  //     ),
  //     cell: ({ row }) => (
  //       <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "productName",
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
    accessorKey: "productDetail",
    header: ({ column }) => (
      <div
        className="cursor-pointer flex items-center"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Product Detail
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

      const [isDeleteOpen, setIsDeleteOpen] = useState(false);
      const [deleteId, setDeleteId] = useState<string | "">("");

      const handleDelete = (id: string) => {
        setDeleteId(id);
        setIsDeleteOpen(true);
      };

      const confirmDelete = () => {
        console.log(deleteId)
        if (deleteId !== null) {
          console.log("Deleted item with ID:", deleteId);
          toast("Delete Success", {
            description: "Product Data Has Been Deleted",
          })
          setIsDeleteOpen(false);
        }
      };

      const router = useRouter();
      return (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              const queryParams = new URLSearchParams({
                productName: data.productName,
                productDetail: data.productDetail || '',
                productDesc: data.productDesc || '',
                photo: data.photo,
                price: String(data.price),
                qty: String(data.qty),
              }).toString();

              router.push(`/admin/product/stock/${data.id}?${queryParams}`);
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>


          <Button
            variant="outline"
            size="icon"
            onClick={() => handleDelete(data.id!)}
          >
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
