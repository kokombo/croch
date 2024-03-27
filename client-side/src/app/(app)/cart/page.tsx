"use client";
import {
  CartCard,
  Divider,
  EmptyCart,
  H3,
  ThreeDotsLoader,
} from "@/components";
import { useGetCarts } from "@/utilities/api-interactions/cart";

const Cart = () => {
  const { data: carts, isLoading: cartsLoading, isError } = useGetCarts();

  return (
    <main className="grid_center my-20">
      <div className="cart_container">
        {cartsLoading ? (
          <div className="h-200">
            <ThreeDotsLoader />
          </div>
        ) : isError ? (
          <div> </div>
        ) : carts && carts?.length < 1 ? (
          <EmptyCart
            heading="You currently do not have any cart."
            subheading="Browse amazing crafts by talented creators"
            href="/"
            buttonLabel="Go shopping"
            buttonExtraClasses="bg-customblack text-white"
          />
        ) : (
          <div className="flex flex-col gap-8">
            <H3>Cart</H3>

            <Divider />

            <div className="grid grid-cols-1 gap-6">
              {carts?.map((cart) => {
                return <CartCard key={cart.creativeId} cart={cart} />;
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;
