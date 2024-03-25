"use client";

import { useSearchParams } from "next/navigation";
import { usePlaceAnOrder } from "@/utilities/api-interactions/order";
import {
  CustomButton,
  H3,
  OrderSummaryProductList,
  PricingBox,
  RingsLoader,
} from "@/components";
import { useGetCartItems } from "@/utilities/api-interactions/cart";

const Billing = () => {
  const params = useSearchParams();

  const creativeId = params.get("for") as string;

  const {
    data: cart,
    isLoading: orderSummaryLoading,
    isError: orderSummaryLoadingError,
  } = useGetCartItems(creativeId);

  const { placeAnOrder, isPending, isError, error, isSuccess } =
    usePlaceAnOrder(creativeId);

  return (
    <main className="flex gap-6 paddingX py-10">
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
          <RingsLoader />
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
                onClick={() => {}}
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
