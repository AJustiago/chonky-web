"use client";

import React, { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProductCard } from "@/components/product/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, XCircle } from "lucide-react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Separator } from "@/components/ui/separator";
import { productSchema, Product } from "@/schemas/product.schema";

interface EditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  data: Product;
}

const EditDialog: React.FC<EditDialogProps> = ({ isOpen, onClose, data }) => {
  const [productName, setProductName] = useState(data.productName);
  const [productDetail, setProductDetail] = useState(data.productDetail);
  const [photo, setPhoto] = useState(data.photo);
  const [price, setPrice] = useState(String(data.price));
  const [qty, setQty] = useState(String(data.qty));
  const [file, setFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setProductName(data.productName);
    setPhoto(data.photo);
    setPrice(String(data.price));
    setQty(String(data.qty));
  }, [data]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPhoto(URL.createObjectURL(selectedFile));
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPhoto("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[50rem]">
        <DialogHeader>
          <DialogTitle>Product Edit</DialogTitle>
          <DialogDescription>Edit the Box for Changing the Product Detail</DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="flex gap-6">
          <div className="m-4 w-auto">
            <ProductCard
              productName={productName}
              productDetail={productDetail}
              photo={photo}
              price={Number(price)}
              qty={Number(qty)}
              functionEnabled={false}
            />
          </div>
          <Separator orientation="vertical" />
          <div className="m-4 space-y-4 w-full">
            <div className="space-y-2">
              <Label htmlFor="productName">Product Name</Label>
              <Input
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="productDetail">Product Detail</Label>
              <Input
                id="productDetail"
                value={productDetail}
                onChange={(e) => setProductDetail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Product Price</Label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className=""
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="qty">Product Quantity</Label>
              <Input
                id="qty"
                type="number"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUpload">Product Image</Label>
              <div className="flex items-center gap-2">
                <Button onClick={handleButtonClick} variant="outline" className="w-full h-10">
                  <Upload className="mr-2 h-4 w-4" />
                  {file ? file.name : "Upload Image"}
                </Button>

                {file && (
                  <Button
                    onClick={handleRemoveFile}
                    variant="ghost"
                    size="icon"
                    className="text-red-500"
                    title="Remove file"
                  >
                    <XCircle className="h-5 w-5" />
                  </Button>
                )}

                <input
                  title="image upload"
                  id="imageUpload"
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              {file && <p className="text-sm text-muted-foreground">Selected file: {file.name}</p>}
            </div>

            <div className="flex justify-end my-8">
                <Button variant="outline">
                Save
                </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
