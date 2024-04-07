"use client";
import {
  CheckOutCard,
  CouponCard,
  CreativeInfo,
  ShoppingCardProductContainer,
  ThreeDotsLoader,
} from "@/components";
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

  const { data: creative } = useGetCreativeById(creativeId, true);

  useEffect(() => {
    if (!isLoading && (!cart || cart?.cartItems.length < 1)) {
      router.push("/cart");
    }
  }, [cart, router, isLoading]);

  return (
    <main className="flex flex-col lg:flex-row paddingX py-8 lg:py-16 gap-8 lg:gap-6">
      <div className="lg:w-[68%]">
        <ShoppingCardProductContainer
          cart={cart}
          isLoading={isLoading}
          isSuccess={isSuccess}
        />

        {creative && (
          <div className="py-6 px-7 border_grey_1 bg-gray rounded-xl sm:w-[500px] mt-8 lg:mt-[145px] ">
            <CreativeInfo creative={creative} />
          </div>
        )}
      </div>

      <div className="sm:w-[500px] lg:w-[32%] flex flex-col gap-8 lg:gap-6">
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
