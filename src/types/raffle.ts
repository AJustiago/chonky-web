
export interface Raffle {
    id: string;
    title: string;
    description: string;
    prizeName: string;
    prizeValue: number;
    startDate: string;
    endDate: string;
    numberOfWinners: number;
    status: 'ongoing' | 'finished';
    participants?: number;
    imageUrl?: string;
  }
  
  export interface RaffleParticipant {
    id: string;
    raffleId: string;
    name: string;
    email: string;
    phoneNumber: string;
    registrationDate: string;
  }