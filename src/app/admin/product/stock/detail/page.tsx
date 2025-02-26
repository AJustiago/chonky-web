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
import { Eye, ChevronLeftIcon, Check } from "lucide-react";
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
      product_name: "",
      product_colorway: "",
      product_desc: "",
      photo: "",
      price: 0,
      qty: 0,
    },
  });
  
  useEffect(() => {
    if (searchParams) {
      const id = searchParams.get("id");
      if (!id) {
        setValue("product_name", "");
        setValue("product_colorway", "");
        setValue("product_desc", "");
        setValue("photo", "");
        setValue("price", 0);
        setValue("qty", 0);
        setPreviewUrl("/placeholder.svg");
      } else {
        const product_name = searchParams.get("product_name");
        const product_colorway = searchParams.get("product_colorway");
        const product_desc = searchParams.get("product_desc");
        const photo = searchParams.get("photo");
        const price = searchParams.get("price");
        const qty = searchParams.get("qty");
        
        if (product_name) setValue("product_name", product_name);
        if (product_colorway) setValue("product_colorway", product_colorway);
        if (product_desc) setValue("product_desc", product_desc);
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
    console.log("test")
    setIsSubmitting(true);
    try {
      if (Object.keys(errors).length > 0) {
        console.log("Validation errors:", errors);
        alert("Please fill in all required fields.");
        return;
      }
  
      console.log("Submitting Product:", data);
      alert("Product added successfully!");
      router.push("/admin/product/stock");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to add product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };  
  
  const [productPhotos, setProductPhotos] = useState<string[]>(watch("photo") ? watch("photo").split(",") : []);

  useEffect(() => {
    if (watch("photo") !== productPhotos.join(",")) {
      setValue("photo", productPhotos.join(","));
    }
  }, [productPhotos, setValue, watch]);  
  
  const handleAddImage = (newImageUrl: string) => {
    setProductPhotos((prevPhotos) => {
      const updatedPhotos = [...prevPhotos, newImageUrl];
      setValue("photo", updatedPhotos.join(","));
      return updatedPhotos;
    });
  };  
  
  return (
    <AdminLayout>
      <div className="container mx-auto p-4">
        <MyBreadcrumbs user={"Admin"} menu={["Product Stock", id ? "Edit Product" : "Add Product"]} link={["/admin/product/stock"]}/>
        <Button 
            variant="outline" 
            type="button" 
            className="mt-4"
            onClick={() => router.push(`/admin/product/stock`)}
          >
            <ChevronLeftIcon className="w-4 h-4 mr-2" />
            Back
        </Button>
        <h1 className="text-2xl font-bold my-6">{id ? "Edit Product" : "Add Product"}</h1>
        <div className="grid md:grid-cols-[300px_1fr] gap-8">
          {/* Image Upload Section */}
          <div className="space-y-4">
            <EmblaCarousel imagePath={productPhotos} onAddImage={handleAddImage} />
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="product_name">Product Name</Label>
              <Controller
                name="product_name"
                control={control}
                render={({ field }) => <Input {...field} id="product_name" placeholder="Enter product name" />}
              />
              {errors.product_name && <p className="text-red-500 text-sm mt-1">{errors.product_name.message}</p>}
            </div>

            <div>
              <Label htmlFor="product_colorway">Product Colorway</Label>
              <Controller
                name="product_colorway"
                control={control}
                render={({ field }) => <Input {...field} id="product_colorway" placeholder="Enter product colorway" />}
              />
            </div>

            <div>
              <Label htmlFor="product_desc">Product Description</Label>
              <Controller
                name="product_desc"
                control={control}
                render={({ field }) => <Textarea {...field} id="product_desc" placeholder="Enter product description" />}
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
                <Button variant={"outline"} type="submit" disabled={isSubmitting} className="w-1/2">
                  <Check className="w-4 h-4 mr-2" />
                  {isSubmitting ? (id ? "Updating..." : "Adding...") : id ? "Update" : "Add"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
