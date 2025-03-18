"use client";

import AdminLayout from "@/components/admin/adminLayout";
import React, { useState, Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import MyBreadcrumbs from "@/components/admin/breadcrumbs";
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Product } from "@/types/product";
import { getProductsById, createProduct, updateProduct } from "@/services/productService";
import { useMutation, useQuery } from "@tanstack/react-query";
import '@/styles/embla.css'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ImageUploader from '@/components/admin/image-uploader';
import ColorwayManager from './colorway-uploader';
import DialogPreview from "./dialog-product";
import { Eye } from 'lucide-react';
import Editor from "@/components/ui/rich-text/editor"

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
      <AdminLayout>
        <DetailProductContent />
      </AdminLayout>
    </Suspense>
  );
}

function DetailProductContent() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const id = searchParams.get("id");  

  const [value, setValue] = useState("hello world ")
  
  const isNew = !id || id === "new";
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const [previewData, setPreviewData] = useState<Product & { functionEnabled: boolean }>({
    name: '',
    description: '',
    colorways: [],
    images: [],
    price: 0,
    quantity: 1,
    functionEnabled: false,
  });

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => (isNew ? null : getProductsById(id)),
    enabled: !isNew,
  });

  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      colorways: [],
      quantity: 0,
      price: 0,
      images: [],
    }
  });

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name || "",
        description: product.description || "",
        colorways: product.colorways || [],
        quantity: product.quantity || 0,
        price: product.price || 0,
        images: product.images || [],
      });
      setValue(product.description || "");
    }
  }, [product, form]);

  
  console.log(form.getValues())

  const handlePreview = () => {
    setPreviewData({
      name: form.getValues('name'),
      description: form.getValues('description'),
      colorways: form.getValues('colorways'),
      images: form.getValues('images'),
      price: form.getValues('price'),
      quantity: form.getValues('quantity'),
      functionEnabled: false,
    });
    setIsPreviewOpen(true);
  };
  
  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success("Product added successfully", {
        description: 'Product has been added to your inventory'
      });
      router.push("/admin/product/order/stock")
    },
    onError: () => {
      toast.error("Failed to add Product", {
        description: 'There was a problem adding product.'
      })
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<FormValues> }) => updateProduct(id, data),
    onSuccess: () => {
      toast.success("Product updated successfully", {
        description: `Product has been updated to your inventory `
      });
      router.push("/admin/product/order/stock")
    },
    onError: () => {
      toast.error("Failed to update Product", {
        description: 'There was a problem update thew product.'
      })
    }
  })

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);

    try {
      const formattedValues = {
        name: values.name,
        description: values.description,
        colorways: values.colorways,
        quantity: values.quantity,
        price: values.price,
        images: values.images
      };

      if (isNew) {
        await createMutation.mutateAsync(formattedValues);
      } else if (id) {
        await updateMutation.mutateAsync({ id, data: formattedValues });
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-4xl">
                <Card className="border border-border/40 bg-card/80 backdrop-blur-sm shadow-sm">
                  <CardHeader>
                    <CardDescription>
                      Fill in the details below to add a new product to your inventory
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="product-images">Product Images</Label>
                      <ImageUploader images={form.watch("images")} setImages={(images) => form.setValue("images", images)} maxImages={5} />
                    </div>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter product name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="space-y-2">
                      <Label htmlFor="product-colorways">Product Colorways</Label>
                      <ColorwayManager colorways={form.watch("colorways")} setColorways={(colorways) => form.setValue("colorways", colorways)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="product-colorways">Product Description</Label>
                      <Editor content={value} onChange={setValue} placeholder="Write your post here..." />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" type="button" onClick={handlePreview}><Eye className="w-4 h-4 mr-2" />Preview</Button>
                    <DialogPreview isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} data={previewData} />
                    <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Adding...' : 'Add Product'}</Button>
                  </CardFooter>
                </Card>
              </form>
            </Form>
          </div>          
      </div>
  );
}
