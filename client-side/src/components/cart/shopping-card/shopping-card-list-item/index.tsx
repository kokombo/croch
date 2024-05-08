import Image from "next/image";
import { H6, OvalLoader } from "@/components";
import { Counter } from "@/components/product";
import { useEffect, useState } from "react";
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

  const {
    updateCartItemCount,
    error,
    isPending: updatingCount,
  } = useUpdateCartItemCount(
    props.cartItem.info._id,
    count,
    props.cartItem.info.owner
  );

  const { removeFromCart } = useRemoveFromCart(props.cartItem.info._id);

  useEffect(() => {
    updateCartItemCount();

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const decreaseCount = () => {
    setCount((prev) => prev - 1);
  };

  const increaseCount = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <article className="flex flex-col lg:flex-row items-start lg:items-center gap-3 lg:h-[72px]">
      <div className="w-full lg:w-1/3 flex flex-col items-start lg:flex-row lg:items-center gap-2 lg:gap-4">
        <div className="flex items-center gap-2 lg:gap-4">
          <button type="button" onClick={removeFromCart}>
            <Image
              src={icons.closered}
              alt="delete-cart-item-icon"
              height={24}
              width={24}
            />
          </button>

          <div className="relative h-[72px] w-[72px] rounded-[2px]">
            <Image
              src={props.cartItem.thumbNail}
              alt=""
              fill
              quality={100}
              loading="lazy"
              className="rounded-[2px]"
              sizes="any"
            />
          </div>
        </div>

        <H6 extraClasses="text-wrap"> {props.cartItem.title.slice(0, 25)}</H6>
      </div>

      <div className="w-full flex items-center justify-between lg:w-2/3 lg:grid lg:grid-cols-4 lg:place-items-center">
        <H6>&#8358;{props.cartItem.info.price.toLocaleString()}</H6>

        <Counter
          count={count}
          decreaseCount={decreaseCount}
          increaseCount={increaseCount}
          decreaseCountButtonDisabled={Boolean(count < 2)}
          extraClasses="py-2 px-3 lg:py-3 lg:px-4 gap-2"
        />

        <H6>
          {props.cartItem.size === "small"
            ? "S"
            : props.cartItem.size === "medium"
              ? "M"
              : props.cartItem.size === "large"
                ? "L"
                : props.cartItem.size === "extraLarge"
                  ? "XL"
                  : "Nil"}
        </H6>

        {updatingCount ? (
          <OvalLoader height="20" width="20" color="#000000" />
        ) : (
          <H6> &#8358;{props.cartItem.cummulativePrice.toLocaleString()} </H6>
        )}
      </div>
    </article>
  );
};

export default ShoppingCardListItem;
