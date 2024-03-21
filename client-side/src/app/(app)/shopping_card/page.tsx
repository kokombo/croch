"use client";

import { H3, ShoppingCardListItem } from "@/components";
import { useGetCartItems } from "@/utilities/api-interactions/cart";
import { useSearchParams } from "next/navigation";

const ShoppingCard = () => {
  const params = useSearchParams();

  const creativeId = params.get("id") as string;

  const { data: cart, isLoading, isError, error } = useGetCartItems(creativeId);

  const Heading = ({ text }: { text: string }) => {
    return <h6 className="font-semibold text-customblack text-sm">{text}</h6>;
  };

  return (
    <main className="flex px-[4.6%] py-10 gap-6">
      <div className="w-[70%] flex flex-col gap-1 py-8 border-[1px] border-grey rounded-xl">
        <span className="px-8 ">
          <H3>Shopping Card</H3>
        </span>

        <>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div>
              <div className="flex items-center my-4 gap-6 bg-gray px-8 h-16">
                <div className="w-1/3">
                  <Heading text="PRODUCT" />
                </div>

                <div className="w-2/3 grid grid-cols-4 place-items-center">
                  <Heading text="PRICE" />

                  <Heading text="QUANTITY" />

                  <Heading text="SIZE" />

                  <Heading text="SUB-TOTAL" />
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
