"use client";
import {
  CartItemsTableHead,
  CheckOutCard,
  CouponCard,
  CreativeInfo,
  H3,
  ShoppingCardListItem,
  ThreeDotsLoader,
} from "@/components";
import { icons } from "@/constants";
import { useGetCartItems } from "@/utilities/api-interactions/cart";
import { useGetCreativeById } from "@/utilities/api-interactions/creative";
import Image from "next/image";
import Link from "next/link";
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
    <main className="flex paddingX py-10 gap-6">
      <div className="w-[70%]">
        <div className=" flex flex-col gap-1 py-8 border_grey_1 rounded-xl h-fit">
          <span className="mx-8 block">
            <H3>Shopping Card</H3>
          </span>

          <>
            {isLoading ? (
              <div className="flex_item_justify_center h-40">
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

          {isSuccess && (
            <Link
              href={`/cart`}
              className="flex items-center gap-2 py-4 px-6 border_grey_1 rounded-xl w-fit ml-8 hover:bg-gray"
            >
              <Image
                src={icons.arrowleft}
                alt="arrow-left-icon"
                height={20}
                width={20}
              />

              <span>Return to cart</span>
            </Link>
          )}
        </div>

        {creative && (
          <div className="py-6 px-7 border_grey_1 bg-gray rounded-xl w-[500px] mt-[145px] ">
            <CreativeInfo creative={creative} />
          </div>
        )}
      </div>

      <div className="w-[30%] flex flex-col gap-6">
        <div className="white_card ">
          {isLoading || isError ? (
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
