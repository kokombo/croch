"use client";

import { Divider, H3, ThreeDotsLoader, StyledLink } from "@/components";
import { CartCard, EmptyCart } from "@/components/cart";
import { useGetCarts } from "@/utilities/api-interactions/cart";
import { icons } from "@/constants";
import { CustomButton } from "@/components/buttons";

const Cart = () => {
  const { data: carts, isLoading, isError, error, refetch } = useGetCarts();

  return (
    <main className="grid_center paddingX py-8 lg:py-16 ">
      <div className="cart_container">
        {isLoading ? (
          <div className="h-200">
            <ThreeDotsLoader />
          </div>
        ) : isError ? (
          <div className="h-2/5 flex_item_justify_center space-y-2">
            <p className="font-semibold">{error?.response?.data.message} </p>

            <CustomButton
              type="reset"
              label="Try Again"
              onClick={() => refetch()}
              className="bg-black text-white font-medium w-full py-3 px-4 lg:py-4"
            />
          </div>
        ) : carts && carts?.length < 1 ? (
          <EmptyCart
            heading="You currently do not have any cart."
            subheading="Browse amazing crafts by talented creators"
            href="/"
            buttonLabel="Go shopping"
            buttonExtraClasses="bg-customblack text-white"
          />
        ) : (
          <div className="flex flex-col gap-6 lg:gap-8">
            <H3>Cart</H3>

            <Divider />

            <div className="grid grid-cols-1 gap-6">
              {carts?.map((cart) => {
                return <CartCard key={cart.creativeId} cart={cart} />;
              })}

              <StyledLink
                href="/"
                label="Return to marketplace"
                leftIcon={icons.arrowleft}
                extraClasses="border_grey_1 w-fit mt-6 hover:bg-gray"
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;
