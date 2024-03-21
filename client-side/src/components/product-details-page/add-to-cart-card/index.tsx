import {
  AvailabilityAndGenderBox,
  Counter,
  CustomButton,
  DeliveryTime,
  Divider,
  PriceBox,
  SelectProductSize,
  ProductInfo,
} from "@/components";
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
  const [size, setSize] = useState("");

  const { session } = useCurrentUser();

  const dispatch: DispatchType = useDispatch();

  const { addToCart } = useAddToCart(props.product._id, size, count);

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

      <Divider />

      <PriceBox product={props.product} count={count} />

      <Divider />

      <DeliveryTime product={props.product} />
    </div>
  );
};

export default AddToCartCard;
