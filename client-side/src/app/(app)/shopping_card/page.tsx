"use client";

import { ShoppingCardListItem } from "@/components";
import { useGetCartItems } from "@/utilities/api-interactions/cart";
import { useSearchParams } from "next/navigation";

const ShoppingCard = () => {
  const params = useSearchParams();

  const creativeId = params.get("id") as string;

  const { data: cart, isLoading, isError, error } = useGetCartItems(creativeId);

  return (
    <main className="flex px-[4.6%] py-10 gap-6">
      <div className="w-[70%] flex flex-col gap-1 py-8 border-[1px] border-grey rounded-xl">
        <span className="px-8 text-xl font-bold text-customblack">
          Shopping Card
        </span>

        <>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div>
              <div className="flex items-center my-4 gap-6 bg-gray px-8 h-16">
                <div className="w-1/3">
                  <h6 className="font-semibold text-customblack text-sm">
                    PRODUCT
                  </h6>
                </div>

                <div className="w-2/3 grid grid-cols-4 place-items-center">
                  <h6 className="font-semibold text-customblack text-sm">
                    PRICE
                  </h6>

                  <h6 className="font-semibold text-customblack text-sm">
                    QUANTITY
                  </h6>

                  <h6 className="font-semibold text-customblack text-sm">
                    SIZE
                  </h6>

                  <h6 className="font-semibold text-customblack text-sm">
                    SUB-TOTAL
                  </h6>
                </div>
              </div>

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

      <div className="w-[30%] py-6 px-5 flex flex-col gap-6 bg-white shadow-lg rounded-xl border-[1px] border-grey "></div>
    </main>
  );
};

export default ShoppingCard;
