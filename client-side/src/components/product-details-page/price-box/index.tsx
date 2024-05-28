type Props = {
  product: Product;
  count: number;
};

const PriceBox = (props: Props) => {
  return (
    <div className="flex flex-col gap-7">
      <span className={`${commonClasses} font-medium`}>
        <h5>Quantity price</h5>

        <h6>&#8358;{props.product.price.toLocaleString()} </h6>
      </span>

      <span className={`${commonClasses} font-medium`}>
        <h5>Item count</h5>

        <h6>{props.count}</h6>
      </span>

      <span className={`${commonClasses} font-bold`}>
        <h5>Total cost</h5>

        <h6>&#8358;{(props.product.price * props.count).toLocaleString()}</h6>
      </span>
    </div>
  );
};

export default PriceBox;

const commonClasses = "flex items-center justify-between text-sm";
