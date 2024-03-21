import { ProductCard, ProductSkeleton } from "..";
import { useGetAllProducts } from "@/utilities/api-interactions/product";

const ProductsList = () => {
  const {
    data: products,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetAllProducts();

  console.log(error);

  return (
    <>
      {isLoading ? (
        <section className="h-screen grid grid-cols-4 gap-x-4">
          {[...Array(8)].map((_, index) => {
            return <ProductSkeleton key={index.toString()} />;
          })}
        </section>
      ) : isError ? (
        <section className="h-screen">
          {error?.response?.data.message || error?.message}{" "}
        </section>
      ) : (
        <section className="grid grid-cols-4 gap-x-4 gap-y-10">
          {products?.map((product) => {
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
