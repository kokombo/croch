"use client";

import { useSearchParams } from "next/navigation";
import { usePlaceAnOrder } from "@/utilities/api-interactions/order";
import {
  H3,
  OrderSummaryProductList,
  OverlayLoader,
  RingsLoader,
} from "@/components";
import { CustomButton } from "@/components/buttons";
import { PricingBox } from "@/components/cart";
import { useGetCartItems } from "@/utilities/api-interactions/cart";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { icons } from "@/constants";

const Billing = () => {
  const params = useSearchParams();

  const router = useRouter();

  const creativeId = params.get("for") as string;

  const {
    data: cart,
    isLoading: orderSummaryLoading,
    isError: orderSummaryLoadingError,
    isSuccess: oSuccess,
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
    if ((oSuccess && !cart) || orderSummaryLoadingError) {
      router.push("/cart");
    }
  }, [orderSummaryLoadingError, oSuccess, cart, router]);

  return (
    <main className="flex gap-6 paddingX py-8 lg:py-16">
      {placingOrderIsPending && (
        <OverlayLoader>
          <RingsLoader />
        </OverlayLoader>
      )}

      {orderSummaryLoading && <OverlayLoader />}

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
                extraClasses="text-white bg-green p-4 w-full"
                rightIcon={icons.arrowrightwhite}
              />
            </div>
          )
        )}
      </div>
    </main>
  );
};

export default Billing;
