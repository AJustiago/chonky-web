import { Raffle, RaffleParticipant } from "@/types/raffle";

const mockRaffles: Raffle[] = [
  {
    id: "1",
    title: "Summer Tech Giveaway",
    description: "Win the latest gadgets in our summer raffle!",
    startDate: "2023-06-01T00:00:00.000Z",
    endDate: "2023-08-31T23:59:59.999Z",
    status: "ongoing",
    images: ["/placeholder.svg"],
    product: [
      {
        id: "p1",
        name: "Smart Gadget Bundle",
        images: ["/placeholder.svg"],
        variant: "Bundle",
        colorways: ["Black", "White"],
        description: "Includes smart watch, wireless earbuds, and a portable charger.",
        price: 299.99,
        quantity: 10,
      }
    ]
  },
  {
    id: "2",
    title: "Gaming Console Extravaganza",
    description: "Try your luck to win gaming consoles and accessories!",
    startDate: "2023-07-15T00:00:00.000Z",
    endDate: "2023-09-15T23:59:59.999Z",
    status: "ongoing",
    images: ["/placeholder.svg"],
    product: [
      {
        id: "p2",
        name: "PlayStation 5",
        images: ["/placeholder.svg"],
        variant: "Disc Edition",
        colorways: ["White"],
        description: "Experience next-gen gaming with the PlayStation 5.",
        price: 499.99,
        quantity: 2,
      }
    ]
  },
  {
    id: "3",
    title: "Smartphone Bonanza",
    description: "Win the latest smartphones in our tech raffle!",
    startDate: "2023-05-01T00:00:00.000Z",
    endDate: "2023-07-01T23:59:59.999Z",
    status: "finished",
    images: ["/placeholder.svg"],
    product: [
      {
        id: "p3",
        name: "iPhone 14 Pro",
        images: ["/placeholder.svg"],
        variant: "128GB",
        colorways: ["Space Black", "Silver"],
        description: "Latest Apple flagship with amazing performance.",
        price: 999.99,
        quantity: 3,
      }
    ]
  },
  {
    id: "4",
    title: "Home Entertainment Package",
    description: "Win a complete home entertainment setup!",
    startDate: "2023-04-15T00:00:00.000Z",
    endDate: "2023-06-15T23:59:59.999Z",
    status: "finished",
    images: ["/placeholder.svg"],
    product: [
      {
        id: "p4",
        name: "85\" 4K OLED TV + Soundbar",
        images: ["/placeholder.svg"],
        variant: "Home Setup",
        colorways: ["Black"],
        description: "An immersive home theater experience.",
        price: 3499.99,
        quantity: 1,
      }
    ]
  },
  {
    id: "5",
    title: "Holiday Travel Sweepstakes",
    description: "Win a dream vacation to any destination of your choice!",
    startDate: "2023-11-01T00:00:00.000Z",
    endDate: "2023-12-25T23:59:59.999Z",
    status: "upcoming",
    images: ["/placeholder.svg"],
    product: [
      {
        id: "p5",
        name: "All-Expenses Paid Trip for Two",
        images: ["/placeholder.svg"],
        variant: "Luxury",
        colorways: ["N/A"],
        description: "Choose your dream destination and we’ll handle the rest.",
        price: 5000.00,
        quantity: 1,
      }
    ]
  },
  {
    id: "6",
    title: "Next-Gen VR Experience",
    description: "Be among the first to try the latest virtual reality technology!",
    startDate: "2023-10-15T00:00:00.000Z",
    endDate: "2023-11-30T23:59:59.999Z",
    status: "upcoming",
    images: ["/placeholder.svg"],
    product: [
      {
        id: "p6",
        name: "Meta Quest 3 Pro",
        images: ["/placeholder.svg"],
        variant: "256GB",
        colorways: ["Black", "Grey"],
        description: "Cutting-edge virtual reality experience.",
        price: 799.99,
        quantity: 3,
      }
    ]
  }
];

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
let participants = [...mockParticipants];

export const getRaffles = async (): Promise<Raffle[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(raffles);
    }, 500); // Simulate network delay
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

export const getRaffleParticipants = async (raffleId: string): Promise<RaffleParticipant[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredParticipants = participants.filter(p => p.raffleId === raffleId);
      resolve(filteredParticipants);
    }, 500);
  });
};

export const getAllRaffleParticipants = async (): Promise<RaffleParticipant[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(participants);
    }, 500);
  });
};
