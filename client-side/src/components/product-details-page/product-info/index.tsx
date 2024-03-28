import { H6, UnclickableRating } from "@/components";

type Props = {
  product: Product;
};

const ProductInfo = (props: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className=" lg:text-xl font-semibold text-neutral">
        Craft made in Nigeria
      </h3>

      <span className="flex items-center gap-1 lg:gap-6">
        <span className="text-sm font-semibold ">
          {props.product.rating ? (
            <UnclickableRating rating={props.product.rating} />
          ) : (
            <span className="underline">
              <H6>No rating yet</H6>
            </span>
          )}
        </span>

        <span className=" underline">
          <H6>
            {props.product.numberOfReviews
              ? `${props.product.numberOfReviews} Reviews`
              : "No reviews yet"}
          </H6>
        </span>
      </span>
    </div>
  );
};

export default ProductInfo;
