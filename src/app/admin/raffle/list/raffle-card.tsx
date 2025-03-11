import React from "react";
import Link from "next/link";
import { Raffle } from "@/types/raffle";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Award } from "lucide-react";
import Image from "next/image";

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

  const statusColor = raffle.status === "ongoing" 
    ? "bg-raffle-green text-green-700" 
    : "bg-raffle-yellow text-yellow-700";

  return (
    <Link href={`/raffle/${raffle.id}`}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-md">
        {raffle.imageUrl && (
          <div className="relative h-40 overflow-hidden">
            <Image
              src={raffle.imageUrl ? raffle.imageUrl : "/placeholder.svg"} 
              alt={raffle.title}
              layout="fill"
              objectFit="cover"
              className="w-full h-full"
            />
          </div>
        )}
        <CardContent className="p-5">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-semibold line-clamp-1">{raffle.title}</h3>
            <Badge variant="secondary" className={statusColor}>
              {raffle.status === "ongoing" ? "Ongoing" : "Finished"}
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
            {raffle.participants && (
              <div className="flex items-center text-sm text-gray-500">
                <Users className="w-4 h-4 mr-2 text-raffle-purple" />
                <span>{raffle.participants} participants</span>
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
