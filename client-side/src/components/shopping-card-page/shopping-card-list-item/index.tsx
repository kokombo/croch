import Image from "next/image";
import { Counter } from "@/components";
import { useState } from "react";
import { icons } from "@/constants";
import {
  useRemoveFromCart,
  useUpdateCartItemCount,
} from "@/utilities/api-interactions/cart";

type Props = {
  cartItem: CartItem;
};

const ShoppingCardListItem = (props: Props) => {
  const [count, setCount] = useState<number>(props.cartItem?.count);

  const { updateCartItemCount } = useUpdateCartItemCount(
    props.cartItem.info._id,
    count,
    props.cartItem.info.owner
  );

  const { removeFromCart } = useRemoveFromCart(props.cartItem.info._id);

  const decreaseCount = () => {
    setCount((prev) => prev - 1);
    updateCartItemCount();
  };

  const increaseCount = () => {
    setCount((prev) => prev + 1);
    updateCartItemCount();
  };

  return (
    <div className="flex items-center my-4 gap-6 px-8">
      <div className="w-1/3 flex items-center gap-6">
        <button type="button" onClick={removeFromCart}>
          <Image
            src={icons.closered}
            alt="delete-cart-item-icon"
            height={40}
            width={40}
          />
        </button>

        <div className="relative h-[72px] w-[72px] ">
          <Image
            src={props.cartItem.thumbNail}
            alt=""
            fill
            quality={100}
            loading="lazy"
            className="object-contain"
            sizes="any"
          />
        </div>

        <h6 className="text-sm flex-wrap"> {props.cartItem.title}</h6>
      </div>

      <div className="w-2/3 grid grid-cols-4 place-items-center">
        <h6>{props.cartItem.info.price} </h6>

        <Counter
          count={count}
          decreaseCount={decreaseCount}
          increaseCount={increaseCount}
          decreaseCountButtonDisabled={Boolean(count < 2)}
        />

        <h6>XL</h6>

        <h6>{props.cartItem.cummulativePrice} </h6>
      </div>
    </div>
  );
};

export default ShoppingCardListItem;
