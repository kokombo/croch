import { Counter, CustomButton, SelectProductSize } from "@/components";
import ProductInfo from "../product-info";
import { useState } from "react";
import { useCurrentUser } from "@/utilities";
import { useDispatch } from "react-redux";
import { DispatchType } from "@/redux/store";
import { setOpenLoginModal } from "@/redux/slices/modal";
import {
  useAddToCart,
  useRemoveFromCart,
  useGetCartItems,
} from "@/utilities/api-interactions/cart";

type Props = {
  product: Product;
};

const AddToCartCard = (props: Props) => {
  const [count, setCount] = useState(1);

  const { session } = useCurrentUser();

  const dispatch: DispatchType = useDispatch();

  const { addToCart } = useAddToCart(props.product._id, count);

  const { removeFromCart } = useRemoveFromCart(props.product._id);

  const { data: items } = useGetCartItems(props.product.owner._id);

  const idsOfProductsInCart = items?.cartItems?.map((cartItem) =>
    cartItem.info._id.toString()
  );

  const addProductToCart = () => {
    if (!session) {
      dispatch(setOpenLoginModal(true));
      document.body.style.overflow = "hidden";
    } else {
      addToCart();
    }
  };

  return (
    <div className="py-6 px-5 flex flex-col gap-6 bg-white shadow-lg rounded-xl border-[1px] border-grey">
      <span className="flex flex-col gap-2 p-4 rounded-lg border-[1px] border-grey">
        <ProductInfo product={props.product} />

        <span className="flex gap-3">
          <h6 className="text-sm">
            Availability:{" "}
            <span className="text-lightgreen font-semibold capitalize">
              {props.product.availability}
            </span>
          </h6>

          <h6 className="text-sm">
            Gender:{" "}
            <span className="text-skyblue font-semibold capitalize">
              {props.product.gender}
            </span>
          </h6>
        </span>
      </span>

      <div className="flex items-end justify-between">
        <SelectProductSize data={props.product.sizes} />

        <Counter
          count={count}
          decreaseCount={() => setCount((prev) => prev - 1)}
          increaseCount={() => setCount((prev) => prev + 1)}
          decreaseCountButtonDisabled={Boolean(count < 2)}
        />
      </div>

      <span>
        {!session || !idsOfProductsInCart?.includes(props.product._id) ? (
          <CustomButton
            type="button"
            label="Add to cart"
            onClick={addProductToCart}
            extraClasses="bg-green text-white w-full py-4"
          />
        ) : (
          <CustomButton
            type="button"
            label="Remove from cart"
            onClick={removeFromCart}
            extraClasses="bg-black text-white w-full py-4"
          />
        )}
      </span>

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

      <div className="border-b-[1px] border-grey"></div>

      <div>
        <span className="text-sm">
          <span className="font-semibold">Note:</span> Delivery within the same
          location usually take{" "}
          <span className="font-bold">
            {props.product.primaryLocation?.minDeliveryDays}-
            {props.product.primaryLocation?.maxDeliveryDays}days
          </span>{" "}
          after purchase{" "}
          <span>
            {props.product.nationwideDelivery && (
              <span>
                while delivery outside primary location will take
                <span className="font-bold">
                  {" "}
                  {props.product.otherLocations?.minDeliveryDays}-
                  {props.product.otherLocations?.maxDeliveryDays}days{" "}
                </span>
                after purchase
              </span>
            )}{" "}
          </span>
        </span>
      </div>
    </div>
  );
};

export default AddToCartCard;

const commonClasses = "flex items-center justify-between text-sm";
