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

  // Calculate percentage of participation
  const participationPercentage = 
    raffle.participants && raffle.maxParticipants
      ? Math.min(100, Math.round((raffle.participants / raffle.maxParticipants) * 100))
      : 0;

  return (
    <Link href={`/admin/raffle/list/detail?id=${raffle.id}`}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-md">
        {raffle.imageUrl && (
          <div className="relative h-40 overflow-hidden">
            <img
              src={raffle.imageUrl}
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
              <Award className="w-4 h-4 mr-2 text-raffle-purple" />
              <span>{raffle.prizeName}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-2 text-raffle-purple" />
              <span>
                {formatDate(raffle.startDate)} - {formatDate(raffle.endDate)}
              </span>
            </div>
            {raffle.participants !== undefined && (
              <div className="space-y-1">
                <div className="flex items-center text-sm text-gray-500 justify-between">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-raffle-purple" />
                    <span>{raffle.participants} participants</span>
                  </div>
                  {raffle.maxParticipants && (
                    <span className="text-xs text-gray-500">
                      {participationPercentage}% filled
                    </span>
                  )}
                </div>
                {raffle.maxParticipants && (
                  <Progress 
                    value={participationPercentage} 
                    className="h-2 bg-gray-100" 
                  />
                )}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 px-5 py-3">
          <div className="flex justify-between items-center w-full">
            <span className="text-sm font-medium">
              {raffle.numberOfWinners} winner{raffle.numberOfWinners > 1 ? "s" : ""}
            </span>
            <span className="text-sm font-semibold text-raffle-purple">
              ${raffle.prizeValue.toLocaleString()}
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default RaffleCard;