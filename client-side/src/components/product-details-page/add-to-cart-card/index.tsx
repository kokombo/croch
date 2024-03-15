import { Counter, CustomButton } from "@/components";
import ProductInfo from "../product-info";
import { useState } from "react";

type Props = {
  product: Product;
};

const AddToCartCard = (props: Props) => {
  const [count, setCount] = useState(1);

  return (
    <div className="py-6 px-5 flex flex-col gap-6 bg-white shadow-xl rounded-xl">
      <span className="flex flex-col gap-2 p-4 rounded-lg border-[1px] border-grey">
        <ProductInfo product={props.product} />

        <h6>
          Availability:{" "}
          <span className="text-lightgreen text-sm font-semibold">
            {props.product.availability}
          </span>
        </h6>
      </span>

      <div className="flex items-center justify-between">
        <span>
          <h6>Size</h6>
        </span>

        <Counter
          count={count}
          decreaseCount={() => setCount((prev) => prev - 1)}
          increaseCount={() => setCount((prev) => prev + 1)}
          decreaseCountButtonDisabled={Boolean(count < 2)}
        />
      </div>

      <span>
        <CustomButton
          type="button"
          label="Add to cart"
          onClick={() => {}}
          extraClasses="bg-black text-white w-full py-4"
        />
      </span>

      <p className="text-sm text-customblack self-center">
        You won{"'"}t be charged yet
      </p>

      <div className="border-b-[1px] border-grey"></div>

      <div className="flex flex-col gap-7">
        <span className={`${commonClasses} font-medium`}>
          <h5>Quantity price</h5>

          <h6>&#8358; {props.product.price} </h6>
        </span>

        <span className={`${commonClasses} font-medium`}>
          <h5>Item count</h5>

          <h6>{count}</h6>
        </span>

        <span className={`${commonClasses} font-bold`}>
          <h5>Total cost</h5>

          <h6>&#8358; {props.product.price * count}</h6>
        </span>
      </div>
    </div>
  );
};

export default AddToCartCard;

const commonClasses = "flex items-center justify-between text-sm font-medium";
