"use client";

import AdminLayout from "@/components/admin/adminLayout";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import React from "react";
import { useState, useEffect, Suspense } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, Product } from "@/schemas/product.schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, X, Check } from "lucide-react";
import DialogPreview from "./dialog-product";
import MyBreadcrumbs from "@/components/admin/breadcrumbs";

import { EmblaOptionsType } from "embla-carousel";
import EmblaCarousel from "@/components/global/carousel/embla-carousel";
import '@/styles/embla.css'

export default function DetailProductPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DetailProductContent />
    </Suspense>
  );
}

function DetailProductContent() {
  const OPTIONS: EmblaOptionsType = {}

  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const id = params?.id as string || searchParams.get("id");

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [_, setPreviewUrl] = useState<string>("");

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Product>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productName: "",
      productColorway: [],
      productDesc: "",
      photo: "",
      price: 0,
      qty: 0,
    },
  });

  useEffect(() => {
    if (searchParams) {
      const id = searchParams.get("id");
      if (!id) {
        setValue("productName", "");
        setValue("productColorway", []);
        setValue("productDesc", "");
        setValue("photo", "");
        setValue("price", 0);
        setValue("qty", 0);
        setPreviewUrl("/placeholder.svg");
      } else {
        const productName = searchParams.get("productName");
        const productColorway = searchParams.get("productColorway");
        const productDesc = searchParams.get("productDesc");
        const photo = searchParams.get("photo");
        const price = searchParams.get("price");
        const qty = searchParams.get("qty");

        if (productName) setValue("productName", productName);
        if (productColorway) setValue("productColorway", productColorway.split(','));
        if (productDesc) setValue("productDesc", productDesc);
        if (photo) {
          setValue("photo", photo);
          setPreviewUrl(photo);
        };
        if (price) setValue("price", parseFloat(price));
        if (qty) setValue("qty", parseInt(qty));
      }
    }
  }, [searchParams, setValue, id]);

  const productData = watch();

  const onSubmit = async (data: Product) => {
    setIsSubmitting(true);
    try {
      console.log(data);
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const url = URL.createObjectURL(file);
  //     setPreviewUrl(url);
  //     setValue("photo", url);
  //   }
  // };
  
  return (
    <AdminLayout>
      <div className="container mx-auto p-4">
        <MyBreadcrumbs user={"Admin"} menu={["Product Stock", id ? "Edit Product" : "Add Product"]} link={["/admin/product/stock"]}/>
        <h1 className="text-2xl font-bold my-6">{id ? "Edit Product" : "Add Product"}</h1>
        <div className="grid md:grid-cols-[300px_1fr] gap-8">
          {/* Image Upload Section */}
          <div className="space-y-4">
            <EmblaCarousel imagePath={productData.photo ? [productData.photo] : []} options={OPTIONS} key={id} />
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="productName">Product Name</Label>
              <Controller
                name="productName"
                control={control}
                render={({ field }) => <Input {...field} id="productName" placeholder="Enter product name" />}
              />
              {errors.productName && <p className="text-red-500 text-sm mt-1">{errors.productName.message}</p>}
            </div>

            <div>
              <Label htmlFor="productColorway">Product Detail</Label>
              <Controller
                name="productColorway"
                control={control}
                render={({ field }) => <Input {...field} id="productColorway" placeholder="Enter product detail" />}
              />
            </div>

            <div>
              <Label htmlFor="productDesc">Product Description</Label>
              <Controller
                name="productDesc"
                control={control}
                render={({ field }) => <Textarea {...field} id="productDesc" placeholder="Enter product description" />}
              />
            </div>

            <div>
              <Label htmlFor="price">Price</Label>
              <Controller
                name="price"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <Input
                    {...field}
                    type="number"
                    value={value}
                    onChange={(e) => onChange(Number.parseFloat(e.target.value) || 0)}
                    id="price"
                    step="0.01"
                    placeholder="Enter price"
                  />
                )}
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
            </div>

            <div>
              <Label htmlFor="qty">Quantity</Label>
              <Controller
                name="qty"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <Input
                    {...field}
                    type="number"
                    value={value}
                    onChange={(e) => onChange(Number.parseInt(e.target.value) || 0)}
                    id="qty"
                    placeholder="Enter quantity"
                  />
                )}
              />
              {errors.qty && <p className="text-red-500 text-sm mt-1">{errors.qty.message}</p>}
            </div>

            <div className="flex items-center w-full gap-80">
              <Button
                variant="outline"
                type="button"
                className="w-1/3"
                onClick={() => setIsPreviewOpen(true)}
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>

              {/* DialogPreview Component */}
              <DialogPreview
                isOpen={isPreviewOpen}
                onClose={() => setIsPreviewOpen(false)}
                data={productData}
              />
              <div className="flex gap-2 w-2/3 justify-end">
                <Button 
                  variant="outline" 
                  type="button" 
                  className="w-1/2"
                  onClick={() => router.push(`/admin/product/stock`)}
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button variant={"outline"} type="submit" disabled={isSubmitting} className="w-1/2">
                  <Check className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Updating..." : "Update"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
