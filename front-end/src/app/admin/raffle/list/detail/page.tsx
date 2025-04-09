"use client";

import AdminLayout from "@/components/admin/adminLayout";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import MyBreadcrumbs from "@/components/admin/breadcrumbs";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Product } from "@/types/product";
import { createRaffle, getRaffleById, updateRaffle } from "@/services/raffleService";
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
import { Eye } from "lucide-react";
import Editor from "@/components/admin/editor";
import { Switch } from "@/components/ui/switch";
import { RaffleProduct } from "@/types/raffle";

export const formProductSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Product name is required"),
  images: z.array(z.string().url("Must be a valid image URL")),
  variant: z.string().min(1, "Variant is required"),
  colorways: z.array(z.string().min(1)),
  description: z.string().min(1, "Description is required"),
  price: z.number().nonnegative("Price must be zero or more"),
  quantity: z.number().int().nonnegative("Quantity must be zero or more"),
});

export const formSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  images: z.array(z.string().url("Must be a valid image URL")),
  description: z.string().min(1, "Description is required"),
  startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Start date must be a valid date string",
  }),
  endDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "End date must be a valid date string",
  }),
  status: z.enum(["ongoing", "finished", "upcoming"]),
  product: z.array(formProductSchema).min(1, "At least one product is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function DetailProductPage() {
  return (
    <AdminLayout>
      <RaffleDetailContent />
    </AdminLayout>
  );
}

function RaffleDetailContent() {
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const isNew = !id || id === "new";
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: raffle, isLoading } = useQuery({
    queryKey: ["raffle", id],
    queryFn: () => (isNew ? null : getRaffleById(id)),
    enabled: !isNew,
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: id || "",
      title: raffle?.title || "",
      images: raffle?.images || [],
      description: raffle?.description || "",
      startDate: raffle?.startDate || new Date().toISOString().split("T")[0],
      endDate: raffle?.endDate || new Date().toISOString().split("T")[0],
      status: (raffle?.status as FormValues["status"]) || "upcoming",
      product: (raffle?.product as RaffleProduct[]) || [],
    },
  });
  
  const [valueEditor, setValueEditor] = useState("");

  useEffect(() => {
    if (raffle && id && id !== "new") {
      form.setValue("id", id);
      form.setValue("title", raffle.title);
      form.setValue("images", raffle.images);
      form.setValue("description", raffle.description);
      form.setValue("startDate", raffle.startDate);
      form.setValue("endDate", raffle.endDate);
      form.setValue("status", (raffle.status as FormValues["status"]) || "upcoming");
      form.setValue("product", (raffle?.product as RaffleProduct[]) || []);
    }
  },[raffle, form, id]);

  const createMutation = useMutation({
    mutationFn: createRaffle,
    onSuccess: () => {
      toast({
        title: "Raffle added successfully",
        description: "Raffle has been added to your inventory",
      });
      router.push("/admin/raffle/list");
    },
    onError: () => {
      toast({
        title:"Failed to add Raffle",
        description: "There was a problem adding Raffle.",
        variant: "destructive"
      });
    },
  });
  
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<FormValues> }) => updateRaffle(id, data),
    onSuccess: () => {
      toast({
        title: "Raffle updated successfully",
        description: "Raffle has been updated to your inventory",
      });
      router.push("/admin/raffle/list");
    },
    onError: () => {
      toast({
        title:"Failed to update Raffle",
        description: "There was a problem updating Raffle.",
        variant: "destructive"
      });
    },
  });


  return (
      <div>
        <h1>This is Raffle Details Page</h1>
      </div>
  );
};


