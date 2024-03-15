import { ProductCard } from "..";

type Props = {
  products: Product[] | undefined;
};

const ProductsList = (props: Props) => {
  return (
    <div className="grid grid-cols-4 gap-x-4 gap-y-10">
      {[...Array(24)].map((_, index) => {
        return <ProductCard key={index} product={dummyProduct} />;
      })}
    </div>
  );
};

export default ProductsList;

const dummyProduct = {
  _id: "2343434",
  title: "Product A",
  availability: "Available",
  price: 4000,
  description: "This is an amazing product",
  gender: "male",
  tag: "beenie",
  colors: ["green", "red", "yellow"],
  nationwideDelivery: true,
  owner: {
    _id: "ABABAB23",
    firstName: "Samuel",
    lastName: "Oluwanbowa",
    picture: "/cp.png",
  },
  rating: 4.5,
  numberOfReviews: 30,
  photos: [
    "/product1.png",
    "/sp.png",
    "/cp.png",
    "/sp.png",
    "/cp.png",
    "/sp.png",
    "/cp.png",
    "/sp.png",
    "/cp.png",
    "/sp.png",
    "/cp.png",
  ],
  sizes: ["", "", ""],
  primaryLocation: {
    minDeliveryDays: 2,
    maxDeliveryDays: 5,
  },
  otherLocations: {
    minDeliveryDays: 5,
    maxDeliveryDays: 7,
  },
};
