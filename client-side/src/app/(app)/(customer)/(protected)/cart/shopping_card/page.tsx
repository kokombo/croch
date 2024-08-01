"use client";
import { OverlayLoader, ThreeDotsLoader } from "@/components";
import { CreativeInfo } from "@/components/product-details-page";
import {
  CheckOutCard,
  CouponCard,
  ShoppingCardProductContainer,
} from "@/components/cart";
import { useGetCartItems } from "@/utilities/api-interactions/cart";
import { useGetCreativeById } from "@/utilities/api-interactions/creative";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { DispatchType } from "@/redux/store";
import { setOpenErrorModal } from "@/redux/slices/modal";

const ShoppingCard = () => {
  const params = useSearchParams();
  const router = useRouter();
  const creativeId = params.get("id") as string;
  const dispatch: DispatchType = useDispatch();

  const {
    data: cart,
    isLoading: cartItemsLoading,
    isError,
    error,
    isSuccess,
  } = useGetCartItems(creativeId);

  const { data: creative } = useGetCreativeById(creativeId, true);

  useEffect(() => {
    if (isSuccess && (!cart || cart?.cartItems.length < 1)) {
      router.push("/cart");
    }

    if (isError) {
      dispatch(setOpenErrorModal(error?.response?.data.message));
      router.push("/cart");
    }
  }, [cart, router, isSuccess, isError, dispatch, error]);

  return (
    <main className="flex flex-col lg:flex-row paddingX py-8 lg:py-16 gap-8 lg:gap-6">
      {cartItemsLoading && <OverlayLoader />}

      <div className="lg:w-[68%]">
        <ShoppingCardProductContainer
          cart={cart}
          isLoading={cartItemsLoading}
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
          {cartItemsLoading ? (
            <div className="h-40">
              <ThreeDotsLoader />
            </div>
          ) : (
            cart && <CheckOutCard cart={cart} />
          )}
        </div>

        <CouponCard pageIsLoading={cartItemsLoading} />
      </div>
    </main>
  );
};

export default ShoppingCard;
