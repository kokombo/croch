type Product = {
  _id: string;
  title: string;
  availability: string;
  price: number;
  description: string;
  gender: string;
  tag: string;
  colors: string[];
  rating: number;
  numberOfReviews: number;
  nationwideDelivery: boolean;
  owner: {
    _id: string;
    firstName: string;
    lastName: string;
    profileImage: string;
  };
  photos: string[];
  price: number;
  sizes: string[];
  primaryLocation: {
    name: string;
    minDeliveryDays: number;
    maxDeliveryDays: number;
  };
  otherLocations: {
    minDeliveryDays: number;
    maxDeliveryDays: number;
  };
};

type Order = {
  creativeId: string;
  customerId: string;
  items: {
    cummulativePrice: number;
    info: {
      price: string;
    };
    thumbNail: string;
    title: string;
    _id: string;
    count: number;
    size: string;
  }[];
  status: string;
  totalPrice: number;
  _id: string;
  createdAt: string;
  brandName: string;
};

type Creative = {
  brandName: string;
  brandLogo: string;
  funFacts: string[];
  isAvailable: boolean;
  superCreative: boolean;
  personalDescription: string;
  yearsOfExperience: number;
  _id: string;
  accountSetupDone: boolean;
  identityVerified: boolean;
};

type CartItem = {
  info: {
    _id: mongoose.Types.ObjectId;
    price: number;
    owner: mongoose.Types.ObjectId;
  };

  title: string;

  size: string;

  thumbNail: string;

  count: number;

  cummulativePrice: number;
};

type Cart = {
  cartItems: CartItem[];
  totalPrice: number;
};

type Carts = {
  brandName: string;
  brandLogo: string;
  creativeId: string;
}[];

type SignupDataType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
};

type LoginData = {
  email: string;
  password: string;
};

type UpdatePassword = {
  oldPassword: string;
  newPassword: string;
};

type NotificationData = {
  message: string;
  receiver: string;
};

interface NotificationRes extends NotificationData {
  createdAt: string;
}

type Tag = {
  _id: string;
  label: string;
  icon: string;
};

type AccountType = {
  img: string | StaticImageData;
  value: string;
  iconWidth: any;
  iconHeight: any;
};

type ErrorResponse = {
  message: string;
};

type MessageResponse = {
  message: string;
};

type WishlistItem = {
  _id: string;
  owner: string;
  photos: strig[];
  title: string;
  availability: string;
  price: number;
};

type CreativeAccountSetupData = {
  brandName: string;
  logo: string;
  personalDescription: string;
  funFacts: string[];
  yearsOfExperience: string;
};

type ReviewData = {
  to: string;
  forOrder: string;
  message: string;
  rating: number;
};

type Review = {
  _id: string;
  createdAt: string;
  to: {
    brandName: string;
  };
  from: {
    firstName: string;
    lastName: string;
    profileImage: string;
  };
  forOrder: string;
  message: string;
  rating: number;
};

type SelectOption = {
  label: string;
  value: string;
};
