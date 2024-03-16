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
        <span>
          <p className="text-sm font-semibold">{props.product.rating}</p>
        </span>

        <p className="text-sm font-semibold underline">
          {props.product.numberOfReviews} Reviews
        </p>
      </span>
    </div>
  );
};

export default ProductInfo;