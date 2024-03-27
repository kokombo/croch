import { H6, UnclickableRating } from "@/components";

type Props = {
  product: Product;
};

const ProductInfo = (props: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xl font-semibold text-neutral">
        Craft made in Nigeria
      </h3>

      <span className="flex items-center gap-6">
        <span className="text-sm font-semibold ">
          {props.product.rating ? (
            <UnclickableRating rating={props.product.rating} />
          ) : (
            <h6 className="underline">No rating yet</h6>
          )}
        </span>

        <p className="text-sm font-semibold underline">
          {props.product.numberOfReviews
            ? `${props.product.numberOfReviews} Reviews`
            : "No reviews yet"}
        </p>
      </span>
    </div>
  );
};

export default ProductInfo;
