type Props = {
  product: Product;
  extraClasses?: string;
};

const ProductAvailability = (props: Props) => {
  return (
    <span
      className={`${props.product.availability === "available" ? "bg-lightgreen" : "bg-skyblue"} w-fit py-1 px-3 text-white rounded capitalize text-sm ${props.extraClasses}`}
    >
      {props.product.availability}
    </span>
  );
};

export default ProductAvailability;
