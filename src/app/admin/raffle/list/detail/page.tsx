"use client";

import AdminLayout from '@/components/admin/adminLayout';
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import MyBreadcrumbs from '@/components/admin/breadcrumbs';
import { Raffle } from '@/types/raffle';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { getRaffleById } from '@/services/raffleService';
import { useQuery, useQueryClient } from "@tanstack/react-query";

const RaffleOrderPage = () => {
    const router = useRouter();
    const { id } = useParams<{ id: string }>();

    const isNew = !id || id === "new";

    const { data: raffle, isLoading } = useQuery({
        queryKey: ["raffle", id],
        queryFn: () => (isNew ? null : getRaffleById(id)),
        enabled: !isNew,
      });


    return (
        <div className="container mx-auto p-4">
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

