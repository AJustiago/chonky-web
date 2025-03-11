"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProductCard } from "@/components/product/card";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/types/product";

interface DialogPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  data: Product;
}

const DialogPreview: React.FC<DialogPreviewProps> = ({ isOpen, onClose, data }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[30rem]">
        <DialogHeader>
          <DialogTitle>Preview Card</DialogTitle>
          <DialogDescription>Card Product in Product Menu Customer</DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="flex gap-6">
          <div className="m-4 w-auto">
            <ProductCard
              name={data.name || "Product Name"}
              colorways={data.colorways || [""]}
              images={data.images || ["/placeholder.svg"]}
              price={data.price || 0}
              quantity={data.quantity || 0}
              functionEnabled={false}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogPreview;
