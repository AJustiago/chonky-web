
export interface Raffle {
    id: string;
    title: string;
    images: string[];
    description: string;
    startDate: string;
    endDate: string;
    status: 'ongoing' | 'finished' | 'upcoming';
    product: RaffleProduct[];
  }

  export interface RaffleProduct {
    id: string;
    name: string;
    images: string[];
    variant: string;
    colorways: string[];
    description: string;
    price: number;
    quantity: number;
  }
  
  export interface RaffleParticipant {
    id: string;
    raffleId: string;
    name: string;
    email: string;
    phoneNumber: string;
    registrationDate: string;
  }