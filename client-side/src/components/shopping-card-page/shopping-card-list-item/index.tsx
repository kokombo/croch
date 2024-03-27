import Image from "next/image";
import { Counter } from "@/components";
import { useEffect, useState } from "react";
import { icons } from "@/constants";
import {
  useRemoveFromCart,
  useUpdateCartItemCount,
} from "@/utilities/api-interactions/cart";
import commaNumber from "comma-number";
import { Tooltip } from "react-tooltip";

type Props = {
  cartItem: CartItem;
};

const ShoppingCardListItem = (props: Props) => {
  const [count, setCount] = useState<number>(props.cartItem?.count);

  const { updateCartItemCount, error } = useUpdateCartItemCount(
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
    <div className="flex items-center gap-3 h-[72px]">
      <div className="w-1/3 flex items-center gap-4">
        <>
          <a id="delete-cart-item-anchor-element">
            <button type="button" onClick={removeFromCart}>
              <Image
                src={icons.closered}
                alt="delete-cart-item-icon"
                height={24}
                width={24}
              />
            </button>
          </a>

          <Tooltip
            anchorSelect="#delete-cart-item-anchor-element"
            content="Remove product"
          />
        </>

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

        <h6 className="text-sm flex-wrap">
          {" "}
          {props.cartItem.title.slice(0, 25)}
        </h6>
      </div>

      <div className="w-2/3 grid grid-cols-4 place-items-center">
        <h6> &#8358;{commaNumber(props.cartItem.info.price)} </h6>

        <Counter
          count={count}
          decreaseCount={decreaseCount}
          increaseCount={increaseCount}
          decreaseCountButtonDisabled={Boolean(count < 2)}
        />

        <h6>
          {props.cartItem.size === "small"
            ? "S"
            : props.cartItem.size === "medium"
              ? "M"
              : props.cartItem.size === "large"
                ? "L"
                : props.cartItem.size === "extraLarge"
                  ? "XL"
                  : "Nil"}
        </h6>

        <h6> &#8358;{commaNumber(props.cartItem.cummulativePrice)} </h6>
      </div>
    </div>
  );
};

export default ShoppingCardListItem;
