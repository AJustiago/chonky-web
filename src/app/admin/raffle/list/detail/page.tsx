"use client";

import AdminLayout from '@/components/admin/adminLayout';
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import MyBreadcrumbs from '@/components/admin/breadcrumbs';
import { Raffle } from '@/types/raffle';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { createRaffle, getRaffleById, updateRaffle } from '@/services/raffleService';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const formSchema = z.object({
    title: z.string().min(2, { message: "Title must be at least 2 characters." }),
    description: z.string().min(10, { message: "Description must be at least 10 characters." }),
    prizeName: z.string().min(2, { message: "Prize name is required." }),
    prizeValue: z.coerce.number().positive({ message: "Prize value must be positive." }),
    startDate: z.string().min(1, { message: "Start date is required." }),
    endDate: z.string().min(1, { message: "End date is required." }),
    numberOfWinners: z.coerce.number().int().positive({ message: "Number of winners must be positive." }),
    status: z.enum(["upcoming", "ongoing", "finished"]),
    imageUrl: z.string().optional(),
    participants: z.coerce.number().int().nonnegative().optional(),
    maxParticipants: z.coerce.number().int().positive().optional(),
  });

type FormValues = z.infer<typeof formSchema>;

const RaffleOrderPage = () => {
    const router = useRouter();
    const { id } = useParams<{ id: string }>();
    const isNew = !id || id === "new";
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { data: raffle, isLoading } = useQuery({
        queryKey: ["raffle", id],
        queryFn: () => (isNew ? null : getRaffleById(id)),
        enabled: !isNew,
      });

    const useFormValues = (raffle?: Raffle | null): FormValues => {
        return formSchema.parse({
            title: raffle?.title || "",
            description: raffle?.description || "",
            prizeName: raffle?.prizeName || "",
            prizeValue: raffle?.prizeValue || 0,
            startDate: raffle?.startDate ? new Date(raffle.startDate).toISOString().split("T")[0] : "",
            endDate: raffle?.endDate ? new Date(raffle.endDate).toISOString().split("T")[0] : "",
            numberOfWinners: raffle?.numberOfWinners || 1,
            status: raffle?.status || "upcoming",
            imageUrl: raffle?.imageUrl || "",
            participants: raffle?.participants || 0,
            maxParticipants: raffle?.maxParticipants || 0,
        });
    };

    const form = useForm<FormValues>({
        defaultValues: useFormValues(raffle),
    });

    const createMutation = useMutation({
        mutationFn: createRaffle,
        onSuccess: () => {
            toast.success("Raffle created",{
            description: "Your new raffle has been created successfully.",
            });
            router.push("/admin/raffle/list");
        },
        onError: () => {
            toast.error("Failed to add raffle",{
            description: "There was a problem creating the raffle.",
            });
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<FormValues> }) => updateRaffle(id, data),
        onSuccess: () => {
            toast.success("Raffle updated", {
            description: "The raffle has been updated successfully."
            });
            router.push("/admin/raffle/list");
        },
        onError: () => {
            toast.error("Failed to update raffle",{
            description: "There was a problem updating the raffle."
            });
        },
    });

    async function onSubmit(values: FormValues) {
        setIsSubmitting(true);
        
        try {
          if (isNew) {
            const formattedValues = {
              ...values,
              startDate: new Date(values.startDate).toISOString(),
              endDate: new Date(values.endDate).toISOString(),
              title: values.title,
              description: values.description,
              prizeName: values.prizeName,
              prizeValue: values.prizeValue,
              numberOfWinners: values.numberOfWinners,
              status: values.status
            };
            await createMutation.mutateAsync(formattedValues);
          } else if (id) {
            const formattedValues = {
              ...values,
              startDate: new Date(values.startDate).toISOString(),
              endDate: new Date(values.endDate).toISOString(),
            };
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
            <h1 className="text-2xl font-bold">{id ? "Edit Raffle" : "Add Raffle"}</h1>
            </div>
        </div>
    );
};

export default function RaffleOrderPageWrapper(){
    return (
        <AdminLayout>
            <RaffleOrderPage />
        </AdminLayout>
    );
};

