import { AxiosError } from "axios";
import { ProductCard, ProductSkeleton } from "..";
import { setOpenErrorModal } from "@/redux/slices/modal";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { DispatchType } from "@/redux/store";

type Props = {
  products: Product[] | undefined;
  isLoading: boolean;
  error: AxiosError<ErrorResponse> | null;
  isError: boolean;
  isSuccess: boolean;
  isPending: boolean;
  isStale: boolean;
};

const ProductsList = (props: Props) => {
  const dispatch: DispatchType = useDispatch();

  useEffect(() => {
    if (props.isError) {
      dispatch(
        setOpenErrorModal(
          "Oops! This is taking too long. Please check your internet connection and refresh the page."
        )
      );
    }
  }, [props.isError, dispatch]);

  return (
    <>
      {props.isLoading || props.isError ? (
        <section className="product_list_container">
          {[...Array(8)].map((_, index) => {
            return <ProductSkeleton key={index.toString()} />;
          })}
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
