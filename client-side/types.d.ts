type Product = {
  _id: string;
  title: string;
  availability: string;
  price: number;
  description: string;
  gender: string;
  tag: string;
  colors: string[];
  nationwideDelivery: boolean;
  owner: {
    _id: string;
    firstName: string;
  };
  photos: string[];
  price: number;
  sizes: string[];
};
