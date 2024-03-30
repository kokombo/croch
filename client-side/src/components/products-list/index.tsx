import { AxiosError } from "axios";
import { ProductCard, ProductSkeleton } from "..";

type Props = {
  products: Product[] | undefined;
  isLoading: boolean;
  error: AxiosError<ErrorResponse> | null;
  isError: boolean;
  isSuccess: boolean;
};

const ProductsList = (props: Props) => {
  return (
    <>
      {props.isLoading ? (
        <section className="product_list_container">
          {[...Array(8)].map((_, index) => {
            return <ProductSkeleton key={index.toString()} />;
          })}
        </section>
      ) : props.isError ? (
        <section className="h-screen">
          {props.error?.response?.data.message || props.error?.message}{" "}
        </section>
      ) : (
        <section className="product_list_container">
          {props.products?.map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })}
        </section>
      )}
    </>
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
