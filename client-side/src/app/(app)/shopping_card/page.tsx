"use client";
import {
  CartItemsTableHead,
  CheckOutCard,
  CouponCard,
  H3,
  ShoppingCardListItem,
  ThreeDotsLoader,
} from "@/components";
import { useGetCartItems } from "@/utilities/api-interactions/cart";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const ShoppingCard = () => {
  const params = useSearchParams();

  const router = useRouter();

  const creativeId = params.get("id") as string;

  const { data: cart, isLoading, isError, error } = useGetCartItems(creativeId);

  useEffect(() => {
    if (!isLoading && (!cart || cart?.cartItems.length < 1)) {
      router.push("/cart");
    }
  }, [cart, router, isLoading]);

  return (
    <main className="flex paddingX py-10 gap-6">
      <div className="w-[70%] flex flex-col gap-1 py-8 border-[1px] border-grey rounded-xl">
        <span className="px-8 ">
          <H3>Shopping Card</H3>
        </span>

        <>
          {isLoading ? (
            <div className="flex_item_justify_center">
              <ThreeDotsLoader />
            </div>
          ) : (
            <div>
              <CartItemsTableHead />

              {cart?.cartItems?.map((cartItem) => {
                return (
                  <ShoppingCardListItem
                    key={cartItem.info._id}
                    cartItem={cartItem}
                  />
                );
              })}
            </div>
          )}
        </>
      </div>

      <div className="w-[30%]">
        <div className="white_card ">
          {isLoading || isError ? (
            <ThreeDotsLoader />
          ) : (
            cart && <CheckOutCard cart={cart} />
          )}
        </div>

        <CouponCard />
      </div>
    </main>
  );
};

export default ShoppingCard;
