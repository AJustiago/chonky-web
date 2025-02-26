"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProductCard } from "@/components/product/card";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/schemas/product.schema";

interface DialogPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  data: Product;
}

const DialogPreview: React.FC<DialogPreviewProps> = ({ isOpen, onClose, data }) => {
  const [productName] = useState(data.productName);
  const [productColorway] = useState(data.productColorway);
  const [photo] = useState(data.photo);
  const [price] = useState(String(data.price));
  const [qty] = useState(String(data.qty));


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
              productName={productName || "Product Name"}
              productColorway={productColorway || [""]}
              photo={photo || "/placeholder.svg"}
              price={Number(price) || 0}
              qty={Number(qty) || 0}
              functionEnabled={false}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogPreview;
