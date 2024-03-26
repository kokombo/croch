"use client";

import { useSearchParams } from "next/navigation";
import { usePlaceAnOrder } from "@/utilities/api-interactions/order";
import {
  CustomButton,
  H3,
  OrderSummaryProductList,
  OverlayLoader,
  PricingBox,
  RingsLoader,
} from "@/components";
import { useGetCartItems } from "@/utilities/api-interactions/cart";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Billing = () => {
  const params = useSearchParams();

  const router = useRouter();

  const creativeId = params.get("for") as string;

  const {
    data: cart,
    isLoading: orderSummaryLoading,
    isError: orderSummaryLoadingError,
  } = useGetCartItems(creativeId);

  const {
    placeAnOrder,
    isPending: placingOrderIsPending,
    isError,
    error,
    isSuccess,
    data,
  } = usePlaceAnOrder(creativeId, {
    onSuccess: () => {
      router.push(`/cart/shopping_card/billing/status?=success`);
    },
  });

  useEffect(() => {
    if (!cart || cart?.cartItems.length === 0) {
      router.push("/");
    }
  }, [cart, router]);

  return (
    <main className="flex gap-6 paddingX py-16">
      {placingOrderIsPending && <OverlayLoader />}

      <div className="w-70">
        <div>
          <H3>Billing Information</H3>
        </div>

        <div>
          <H3>Existing Card</H3>
        </div>
      </div>

      <div className="w-30 white_card">
        {orderSummaryLoading ? (
          <div className="h-[200px] flex items-center justify-center">
            <RingsLoader />
          </div>
        ) : orderSummaryLoadingError ? (
          <span>Try again</span>
        ) : (
          cart && (
            <div className="flex flex-col gap-5">
              <H3>Order Summary</H3>

              <OrderSummaryProductList cartItems={cart.cartItems} />

              <PricingBox cart={cart} />

              <CustomButton
                type="button"
                label="Place order"
                onClick={placeAnOrder}
                disabled={false}
                extraClasses="text-white bg-customblack p-4 w-full"
              />
            </div>
          )
        )}
      </div>
    </main>
  );
};

export default Billing;
