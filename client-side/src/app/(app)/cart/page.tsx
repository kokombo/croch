"use client";

import { CustomButton } from "@/components";
import { useCurrentUser } from "@/utilities";
import { useGetCarts } from "@/utilities/api-interactions/cart";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setOpenLoginModal } from "@/redux/slices/modal";
import { DispatchType } from "@/redux/store";
import { icons } from "@/constants";

const Cart = () => {
  const { data: carts } = useGetCarts();

  const { session, status } = useCurrentUser();

  const dispatch: DispatchType = useDispatch();

  return (
    <main className="grid place-items-center h-screen ">
      <div className="flex flex-col gap-10 p-8 border-[1px] border-grey rounded-xl h-[70vh] w-[60vw]">
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
                return (
                  <div
                    key={cart.creativeId}
                    className="flex items-center justify-between border-[1px] border-grey rounded-xl py-6 px-5"
                  >
                    <div className="flex items-center gap-6">
                      <div className="relative h-[72px] w-[72px] rounded-full bg-grey">
                        <Image
                          src={cart.brandLogo}
                          alt=""
                          className="rounded-full object-cover object-center"
                          quality={100}
                          fill
                          sizes="any"
                        />
                      </div>

                      <article className="flex flex-col gap-2">
                        <h5>{cart.brandName} </h5>

                        <h6>Creator handmade</h6>
                      </article>
                    </div>

                    <div className="flex items-center gap-6">
                      <CustomButton
                        type="button"
                        label="View cart"
                        extraClasses="border-[1px] border-grey p-4 text-grey3 text-sm"
                      />

                      <button>
                        <Image
                          src={icons.deleteicon}
                          alt=""
                          height={21}
                          width={19.5}
                        />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      </div>
    </main>
  );
};

const innerBox = "flex flex-col items-center justify-center h-full";

export default Cart;
