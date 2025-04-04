"use client";

import AdminLayout from "@/components/admin/adminLayout";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import MyBreadcrumbs from "@/components/admin/breadcrumbs";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Product } from "@/types/product";
import { getProductsById, createProduct, updateProduct } from "@/services/productService";
import { useMutation, useQuery } from "@tanstack/react-query";
import "@/styles/embla.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ImageUploader from "@/components/admin/image-uploader";
import ColorwayManager from "@/components/admin/colorway-uploader";
import DialogPreview from "./dialog-product";
import { Eye } from "lucide-react";
import Editor from "@/components/admin/editor";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  name: z.string().min(2, { message: "Product Name must be at least 2 characters." }),
  description: z.string().min(10, { message: "Product Description must be at least 10 characters." }),
  colorways: z.array(z.string()).min(1, { message: "Product Colorway must be at least 1." }),
  quantity: z.coerce.number().int().positive({ message: "Product Quantity must be positive." }),
  price: z.coerce.number().int().positive({ message: "Product Price must be positive." }),
  images: z.array(z.string()).min(1, { message: "Product Image must be at least 1." }),
  onSale: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

export default function DetailProductPage() {
  return (
    <AdminLayout>
      <DetailProductContent />
    </AdminLayout>
  );
}

function DetailProductContent() {
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const isNew = !id || id === "new";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const [previewData, setPreviewData] = useState<Product & { functionEnabled: boolean }>({
    name: "",
    description: "",
    colorways: [],
    images: [],
    price: 0,
    quantity: 0,
    onSale: true,
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
      onSale: true,
    },
  });

  const [valueEditor, setValueEditor] = useState("");

  useEffect(() => {
    if (product && id && id !== "new") { 
      form.reset({
        name: product.name || "",
        description: product.description || "",
        colorways: product.colorways || [],
        quantity: product.quantity || 0,
        price: product.price || 0,
        images: product.images || [],
        onSale: product.onSale ?? true,
      });
      setValueEditor(product.description || ""); 
    }
  }, [product, form, id]);

  const handlePreview = () => {
    setPreviewData({
      name: form.getValues("name"),
      description: valueEditor,
      colorways: form.getValues("colorways"),
      images: form.getValues("images"),
      price: form.getValues("price"),
      quantity: form.getValues("quantity"),
      onSale: form.getValues("onSale"),
      functionEnabled: false,
    });
    setIsPreviewOpen(true);
  };

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast({
        title: "Product added successfully",
        description: "Product has been added to your inventory",
      });
      router.push("/admin/product/stock");
    },
    onError: () => {
      toast({
        title:"Failed to add Product",
        description: "There was a problem adding product.",
        variant: "destructive"
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<FormValues> }) => updateProduct(id, data),
    onSuccess: () => {
      toast({
        title: "Product updated successfully",
        description: "Product has been updated to your inventory",
      });
      router.push("/admin/product/stock");
    },
    onError: () => {
      toast({
        title:"Failed to update Product",
        description: "There was a problem updating product.",
        variant: "destructive"
      });
    },
  });

  const updateImages = (images: string[]) => form.setValue("images", images);
  const updateColorways = (colorways: string[]) => form.setValue("colorways", colorways);

  const onSubmit = async (values: FormValues) => {
    console.log("Trying to submit", values);
    const isValid = await form.trigger();
    if (!isValid) {
      console.log("Validation failed");
      return;
    }
  
    setIsSubmitting(true);
    try {
      const formattedValues = { ...values, description: valueEditor };
      if (isNew) {
        console.log("Creating product...");
        await createMutation.mutateAsync(formattedValues);
      } else if (id) {
        console.log("Updating product...");
        await updateMutation.mutateAsync({ id, data: formattedValues });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isNew && isLoading) {
    return (
      <div className="container flex items-center justify-center h-screen">
        <div>Loading product details...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <MyBreadcrumbs
        user={"Admin"}
        menu={["Product Stock", id && !isNew ? "Edit Product" : "Add Product"]}
        link={["/admin/product/stock"]}
      />
      <div className="flex items-center my-6 space-x-4">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span className="mt-0.5">Back</span>
        </Button>
        <h1 className="text-2xl font-bold">{id && !isNew ? "Edit Product" : "Add Product"}</h1>
      </div>
      <div className="animate-slide-up">
        <Form {...form}>
           <form onSubmit={(e) => {
              console.log("Form Submitted!");
              form.handleSubmit(onSubmit)(e);
            }} className="max-w-4xl" method="POST">
            <Card className="border border-border/40 bg-card/80 backdrop-blur-sm shadow-sm">
              <CardHeader>
                <CardDescription>
                  Fill in the details below to {isNew ? "add a new" : "edit an existing"} product in your inventory
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="product-images">Product Images</FormLabel>
                      <ImageUploader images={field.value} setImages={updateImages} maxImages={5} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                <div className="flex">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Price</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <span className="inline-block bg-muted px-2 py-1 text-muted-foreground rounded-l-md">$</span>
                              <Input placeholder="00.00" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex-1 ml-4">
                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Qty</FormLabel>
                          <FormControl>
                            <Input placeholder="0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="colorways"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="product-colorways">Product Colorways</FormLabel>
                        <ColorwayManager colorways={field.value} setColorways={updateColorways} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="product-description">Product Description</FormLabel>
                        <FormControl>
                          <div>
                            <Editor
                              content={product?.description || ""}
                              onChange={(newValue) => {
                                setValueEditor(newValue);
                                form.setValue("description", newValue);
                              }}
                              placeholder="Write your post here..."
                            />
                            <input type="hidden" {...field} value={valueEditor} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="onSale"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>On Sale</FormLabel>
                      <FormControl>
                        <Switch
                          className="mx-2"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" type="button" onClick={handlePreview}>
                  <Eye className="w-4 h-4 mr-2" />Preview
                </Button>
                <DialogPreview
                  isOpen={isPreviewOpen}
                  onClose={() => setIsPreviewOpen(false)}
                  data={previewData}
                />
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (isNew ? "Adding..." : "Updating...") : (isNew ? "Add Product" : "Update Product")}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
}