"use client";

import { CartCard, CustomButton } from "@/components";
import { useCurrentUser } from "@/utilities";
import { useGetCarts } from "@/utilities/api-interactions/cart";
import { useDispatch } from "react-redux";
import { setOpenLoginModal } from "@/redux/slices/modal";
import { DispatchType } from "@/redux/store";

const Cart = () => {
  const { data: carts, isLoading, isError } = useGetCarts();

  const { session, status } = useCurrentUser();

  const dispatch: DispatchType = useDispatch();

  return (
    <main className="grid place-items-center h-screen ">
      <div className={`${cartContainer}`}>
        <h3>Cart</h3>

        <div className="border-b-[1px] border-grey"></div>

        <>
          {status === "loading" ? (
            <div className={`${innerBox}`}> Loading...</div>
          ) : !session ? (
            <div className={`${innerBox} gap-2`}>
              <h3>Your Carts will go here.</h3>

              <h6>Sign in to see your carts.</h6>

              <CustomButton
                type="button"
                label="Sign in"
                extraClasses="px-6 py-3 bg-black text-white"
                onClick={() => {
                  dispatch(setOpenLoginModal(true));
                  document.body.style.overflow = "hidden";
                }}
              />
            </div>
          ) : carts && carts?.length < 1 ? (
            <div className={`${innerBox} gap-2`}>
              <h3>You currently do not have any cart.</h3>

              <h6>Browse amazing crafts by talented creators.</h6>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {carts?.map((cart) => {
                return <CartCard key={cart.creativeId} cart={cart} />;
              })}
            </div>
          )}
        </>
      </div>
    </main>
  );
};

const cartContainer =
  "flex flex-col gap-10 p-8 border-[1px] border-grey rounded-xl h-[70vh] w-[60vw]";
const innerBox = "flex flex-col items-center justify-center h-full";

export default Cart;
