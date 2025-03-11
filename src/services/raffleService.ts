import { Raffle, RaffleParticipant } from "@/types/raffle";

// Mock data for demonstration
const mockRaffles: Raffle[] = [
  {
    id: "1",
    title: "Summer Tech Giveaway",
    description: "Win the latest gadgets in our summer raffle!",
    prizeName: "MacBook Pro",
    prizeValue: 1999.99,
    startDate: "2023-06-01T00:00:00.000Z",
    endDate: "2023-08-31T23:59:59.999Z",
    numberOfWinners: 1,
    status: "ongoing",
    participants: 342,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "2",
    title: "Gaming Console Extravaganza",
    description: "Try your luck to win gaming consoles and accessories!",
    prizeName: "PlayStation 5",
    prizeValue: 499.99,
    startDate: "2023-07-15T00:00:00.000Z",
    endDate: "2023-09-15T23:59:59.999Z",
    numberOfWinners: 2,
    status: "ongoing",
    participants: 567,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "3",
    title: "Smartphone Bonanza",
    description: "Win the latest smartphones in our tech raffle!",
    prizeName: "iPhone 14 Pro",
    prizeValue: 999.99,
    startDate: "2023-05-01T00:00:00.000Z",
    endDate: "2023-07-01T23:59:59.999Z",
    numberOfWinners: 3,
    status: "finished",
    participants: 879,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "4",
    title: "Home Entertainment Package",
    description: "Win a complete home entertainment setup!",
    prizeName: "85\" 4K OLED TV + Soundbar",
    prizeValue: 3499.99,
    startDate: "2023-04-15T00:00:00.000Z",
    endDate: "2023-06-15T23:59:59.999Z",
    numberOfWinners: 1,
    status: "finished",
    participants: 423,
    imageUrl: "/placeholder.svg"
  },
];

// Mock participants data
const mockParticipants: RaffleParticipant[] = [
  {
    id: "p1",
    raffleId: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phoneNumber: "+1 (555) 123-4567",
    registrationDate: "2023-07-15T10:30:00.000Z"
  },
  {
    id: "p2",
    raffleId: "1",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phoneNumber: "+1 (555) 987-6543",
    registrationDate: "2023-07-16T14:45:00.000Z"
  },
  {
    id: "p3",
    raffleId: "2",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    phoneNumber: "+1 (555) 456-7890",
    registrationDate: "2023-08-01T09:15:00.000Z"
  },
  {
    id: "p4",
    raffleId: "2",
    name: "Alice Brown",
    email: "alice.brown@example.com",
    phoneNumber: "+1 (555) 789-0123",
    registrationDate: "2023-08-02T16:20:00.000Z"
  },
  {
    id: "p5",
    raffleId: "3",
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    phoneNumber: "+1 (555) 234-5678",
    registrationDate: "2023-06-10T11:05:00.000Z"
  }
];

// In-memory store for raffle data (this would be replaced with API calls in a real app)
let raffles = [...mockRaffles];
// let participants = [...mockParticipants];

export const getRaffles = async (): Promise<Raffle[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(raffles);
    }, 500);
  });
};

export const getRaffleById = async (id: string): Promise<Raffle | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const raffle = raffles.find(r => r.id === id);
      resolve(raffle);
    }, 500);
  });
};

export const createRaffle = async (raffle: Omit<Raffle, 'id'>): Promise<Raffle> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newRaffle = {
        ...raffle,
        id: Date.now().toString(),
      };
      raffles = [...raffles, newRaffle];
      resolve(newRaffle);
    }, 500);
  });
};

export const updateRaffle = async (id: string, raffle: Partial<Raffle>): Promise<Raffle | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      raffles = raffles.map(r => r.id === id ? { ...r, ...raffle } : r);
      const updatedRaffle = raffles.find(r => r.id === id);
      resolve(updatedRaffle);
    }, 500);
  });
};

export const deleteRaffle = async (id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      raffles = raffles.filter(r => r.id !== id);
      resolve(true);
    }, 500);
  });
};

// export const getRaffleParticipants = async (raffleId: string): Promise<RaffleParticipant[]> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const filteredParticipants = participants.filter(p => p.raffleId === raffleId);
//       resolve(filteredParticipants);
//     }, 500);
//   });
// };

// export const getAllRaffleParticipants = async (): Promise<RaffleParticipant[]> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(participants);
//     }, 500);
//   });
// };
