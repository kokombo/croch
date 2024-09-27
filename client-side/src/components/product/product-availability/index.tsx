import { twMerge } from "tailwind-merge";

type Props = {
  product: Product;
  className?: string;
};

const ProductAvailability = (props: Props) => {
  return (
    <span
      className={twMerge(
        "w-fit py-1 px-3 text-white rounded capitalize text-sm",
        props.className,
        props.product.availability === "available"
          ? "bg-lightgreen"
          : "bg-skyblue"
      )}
    >
      {props.product.availability}
    </span>
  );
};

export default ProductAvailability;
