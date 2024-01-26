type User = {
  _id: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
};

type ProductBody = {
  title: string;
  availability: boolean;
  price: string;
  description: string;
  gender: string;
  tag: string;
};

type Error = {
  message: string;
};

type Creative = {
  _id: string;
  orders: {
    pendingOrders: string[];
    fulfilledOrders: string[];
    cancelledOrders: string[];
  };
  isAvailable: boolean;
  superCreative: boolean;
  yearsOfExperience: number;
  personalDescription: string;
  funFacts: string[];
};
