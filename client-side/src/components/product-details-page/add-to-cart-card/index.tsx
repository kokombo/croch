import { Divider } from "@/components";
import Counter from "@/components/product/counter";
import AvailabilityAndGenderBox from "../availability+gender";
import DeliveryTime from "../delivery-time";
import PriceBox from "../price-box";
import SelectProductSize from "../select-product-size";
import ProductInfo from "../product-info";
import AddToCartButton from "../add-to-cart-button";
import { useState } from "react";

type Props = {
  product: Product;
};

const AddToCartCard = (props: Props) => {
  const [count, setCount] = useState(1);
  const [size, setSize] = useState("");

  return (
    <div className="py-6 px-5 flex flex-col gap-6 bg-white shadow-lg rounded-xl border-[1px] border-grey">
      <div className="flex flex-col gap-4 p-4 rounded-lg border-[1px] border-grey">
        <ProductInfo product={props.product} />

        <AvailabilityAndGenderBox product={props.product} />
      </div>

      <div className="flex items-end justify-between">
        <SelectProductSize
          data={props.product.sizes}
          size={size}
          setSize={setSize}
        />

        <Counter
          count={count}
          decreaseCount={() => setCount((prev) => prev - 1)}
          increaseCount={() => setCount((prev) => prev + 1)}
          decreaseCountButtonDisabled={Boolean(count < 2)}
          className="py-4 px-5 gap-4"
        />
      </div>

      <AddToCartButton product={props.product} size={size} count={count} />

      <Divider />

      <PriceBox product={props.product} count={count} />

      <Divider />

      <DeliveryTime product={props.product} />
    </div>
  );
};

export default AddToCartCard;
