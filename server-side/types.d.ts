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
  price: number;
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
  rating: number;
};

type Notification = {
  message: string;
};

interface Email {
  from: string;
  to: string | string[];
  subject: string;
  text: string;
  html: string;
}

interface Product extends ProductBody {
  _id: string;
  photos: string[];
  colors: string[];
  sizes: string[];
  owner: string;
  rating: number;
}

type CartItem = {
  info: {
    _id: mongoose.Types.ObjectId;
    price: number;
    owner: mongoose.Types.ObjectId;
  };

  title: String;

  size: String;

  thumbNail: String;

  count: number;

  cummulativePrice: number; //info.price * count
};

type Cart = {
  cartItems: CartItem[];
  totalPrice: number;
};

type Carts = Map<string, Cart>;
