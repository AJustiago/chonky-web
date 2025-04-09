"use client"

import React from "react";
import Link from "next/link";
import { Raffle } from "@/types/raffle";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Award, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface RaffleCardProps {
  raffle: Raffle;
}

const RaffleCard: React.FC<RaffleCardProps> = ({ raffle }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-raffle-yellow text-yellow-700";
      case "ongoing":
        return "bg-raffle-green text-green-700";
      case "finished":
        return "bg-gray-200 text-gray-700";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Clock className="w-3 h-3 mr-1" />;
      case "ongoing":
        return null;
      case "finished":
        return null;
      default:
        return null;
    }
  };

  return (
    <Link href={`/admin/raffle/list/detail?id=${raffle.id}`}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-md">
        {raffle.images && (
          <div className="relative h-40 overflow-hidden">
            <img
              src={raffle.images[0]}
              alt={raffle.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <CardContent className="p-5">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-semibold line-clamp-1">{raffle.title}</h3>
            <Badge variant="secondary" className={getStatusColor(raffle.status)}>
              {getStatusIcon(raffle.status)}
              {raffle.status.charAt(0).toUpperCase() + raffle.status.slice(1)}
            </Badge>
          </div>
          <p className="text-sm text-gray-500 mb-4 line-clamp-2">
            {raffle.description}
          </p>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-2 text-raffle-purple" />
              <span>
                {formatDate(raffle.startDate)} - {formatDate(raffle.endDate)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RaffleCard;