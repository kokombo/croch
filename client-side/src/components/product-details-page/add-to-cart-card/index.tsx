import { Counter, CustomButton } from "@/components";
import ProductInfo from "../product-info";
import { useState } from "react";
import { useCurrentUser } from "@/utilities";
import { useDispatch } from "react-redux";
import { DispatchType } from "@/redux/store";
import { setOpenLoginModal } from "@/redux/slices/modal";
import {
  useAddToCart,
  useRemoveFromCart,
} from "@/utilities/api-interactions/cart";
import {
  useGetCartItems,
  useGetCarts,
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

  const { data: carts } = useGetCarts();

  const idsOfProductsInCart = items?.cartItems.map((cartItem) =>
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

const commonClasses = "flex items-center justify-between text-sm";
