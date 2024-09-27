import Skeleton from "./skeleton";

const ProductSkeleton = () => {
  return (
    <div>
      <span className="w-full rounded-md block">
        <Skeleton className="product width-100" />
      </span>

      <span className="w-1/4 rounded-md block h-4 mt-2 bg-grey">
        <Skeleton className="width-25" />
      </span>

      <span className="w-1/2 rounded-md block h-4 mt-2 bg-grey">
        <Skeleton className="width-50" />
      </span>
    </div>
  );
};

export default ProductSkeleton;
