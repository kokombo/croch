import type { AxiosError } from "axios";
import { ProductSkeleton } from "../..";
import ProductCard from "../product-card";
import { setOpenErrorModal } from "@/redux/slices/modal";
import { useDispatch } from "react-redux";
import { useEffect, Fragment } from "react";
import type { DispatchType } from "@/redux/store";

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
    <Fragment>
      {props.isLoading || props.isError || props.products === undefined ? (
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
    </Fragment>
  );
};

export default ProductsList;
