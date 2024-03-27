"use client";
import {
  CartItemsTableHead,
  CheckOutCard,
  CouponCard,
  CreativeInfo,
  H3,
  ShoppingCardListItem,
  StyledLink,
  ThreeDotsLoader,
} from "@/components";
import { icons } from "@/constants";
import { useGetCartItems } from "@/utilities/api-interactions/cart";
import { useGetCreativeById } from "@/utilities/api-interactions/creative";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const ShoppingCard = () => {
  const params = useSearchParams();

  const router = useRouter();

  const creativeId = params.get("id") as string;

  const {
    data: cart,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetCartItems(creativeId);

  const { data: creative } = useGetCreativeById(creativeId);

  useEffect(() => {
    if (!isLoading && (!cart || cart?.cartItems.length < 1)) {
      router.push("/cart");
    }
  }, [cart, router, isLoading]);

  return (
    <main className="flex paddingX py-16 gap-6">
      <div className="w-70">
        <div className=" flex flex-col gap-1 py-8 border_grey_1 rounded-xl h-fit">
          <span className="mx-8 block">
            <H3>Shopping Card</H3>
          </span>

          <>
            {isLoading ? (
              <div className="flex_item_justify_center h-200">
                <ThreeDotsLoader />
              </div>
            ) : (
              <div>
                <CartItemsTableHead />

                <div className="flex flex-col gap-8 p-6">
                  {cart?.cartItems?.map((cartItem) => {
                    return (
                      <ShoppingCardListItem
                        key={cartItem.info._id}
                        cartItem={cartItem}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </>

          {isSuccess && (
            <StyledLink
              href="/cart"
              label="Return to cart"
              leftIcon={icons.arrowleft}
              extraClasses="border_grey_1 w-fit ml-8 mt-12 hover:bg-gray"
            />
          )}
        </div>

        {creative && (
          <div className="py-6 px-7 border_grey_1 bg-gray rounded-xl w-[500px] mt-[145px] ">
            <CreativeInfo creative={creative} />
          </div>
        )}
      </div>

      <div className="w-30 flex flex-col gap-6">
        <div className="white_card ">
          {isLoading ? (
            <div className="h-40">
              <ThreeDotsLoader />
            </div>
          ) : (
            cart && <CheckOutCard cart={cart} />
          )}
        </div>

        <CouponCard pageIsLoading={isLoading} />
      </div>
    </main>
  );
};

export default ShoppingCard;
