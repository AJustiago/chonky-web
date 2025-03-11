"use client";

import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw } from "lucide-react";
import AdminLayout from "@/components/admin/adminLayout";
import RaffleCard from "./raffle-card";
import { getRaffles } from "@/services/raffleService";
import { Raffle } from "@/types/raffle";

const RafflePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("ongoing");

  const queryClient = useQueryClient();

  const { data: raffles, isLoading, error } = useQuery({
    queryKey: ["raffles"],
    queryFn: getRaffles,
  });

  const refreshRaffles = () => {
    queryClient.invalidateQueries({ queryKey: ["raffles"] });
  };

  const ongoingRaffles = raffles?.filter((raffle) => raffle.status === "ongoing") || [];
  const finishedRaffles = raffles?.filter((raffle) => raffle.status === "finished") || [];

  return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Raffles</h1>
            <p className="text-muted-foreground">Manage your raffles and giveaways.</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={refreshRaffles}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Link href="/admin/raffle/list/detail">
              <Button className="bg-raffle-purple hover:bg-raffle-dark-purple">
                <Plus className="mr-2 h-4 w-4" />
                Add Raffle
              </Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="ongoing" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full sm:w-auto grid-cols-2">
            <TabsTrigger value="ongoing">Ongoing ({ongoingRaffles.length})</TabsTrigger>
            <TabsTrigger value="finished">Finished ({finishedRaffles.length})</TabsTrigger>
          </TabsList>

          {isLoading ? (
            <div className="py-10 text-center">
              <div className="h-20 w-20 mx-auto rounded-full border-4 border-raffle-purple border-t-transparent animate-spin"></div>
              <p className="mt-4 text-muted-foreground">Loading raffles...</p>
            </div>
          ) : error ? (
            <div className="py-10 text-center">
              <p className="text-destructive">Error loading raffles.</p>
            </div>
          ) : (
            <>
              <TabsContent value="ongoing" className="pt-4">
                {ongoingRaffles.length === 0 ? (
                  <div className="py-10 text-center border rounded-lg">
                    <p className="text-muted-foreground">No ongoing raffles.</p>
                    <Link href="/raffle/new" className="mt-4 inline-block">
                      <Button variant="outline">Create your first raffle</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ongoingRaffles.map((raffle: Raffle) => (
                      <RaffleCard key={raffle.id} raffle={raffle} />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="finished" className="pt-4">
                {finishedRaffles.length === 0 ? (
                  <div className="py-10 text-center border rounded-lg">
                    <p className="text-muted-foreground">No finished raffles.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {finishedRaffles.map((raffle: Raffle) => (
                      <RaffleCard key={raffle.id} raffle={raffle} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>

  );
};

export default function RafflePageWrapper() {
  return(
    <AdminLayout>
      <RafflePage />
    </AdminLayout>
  )
};
