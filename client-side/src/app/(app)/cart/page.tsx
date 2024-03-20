"use client";

import { CartCard, CustomButton } from "@/components";
import { useCurrentUser } from "@/utilities";
import { useGetCarts } from "@/utilities/api-interactions/cart";
import { useDispatch } from "react-redux";
import { setOpenLoginModal } from "@/redux/slices/modal";
import { DispatchType } from "@/redux/store";
import Image from "next/image";
import { icons } from "@/constants";
import Link from "next/link";

const Cart = () => {
  const { data: carts, isLoading: cartsLoading, isError } = useGetCarts();

  const { session } = useCurrentUser();

  const dispatch: DispatchType = useDispatch();

  return (
    <main className="grid place-items-center my-20 ">
      <div className={`${cartContainer}`}>
        <h3 className="text-xl font-bold text-customblack">Cart</h3>

        <div className="border-b-[1px] border-grey"></div>

        {!session ? (
          <div className={`${innerBox} gap-10`}>
            <div className="h-[319px] w-[319px] rounded-full bg-grey flex items-center justify-center">
              <Image
                src={icons.emptycart}
                alt=""
                priority
                width={237}
                height={162}
                quality={100}
              />
            </div>

            <span className="flex flex-col items-center gap-2">
              <h3 className="text-xl font-bold">Your Carts will go here.</h3>

              <h6>Sign in now to see the products you{"'"}ve added.</h6>
            </span>

            <CustomButton
              type="button"
              label="Sign in"
              extraClasses="px-7 py-4 bg-white text-customblack border-[1px] border-grey hover:bg-gray"
              onClick={() => {
                dispatch(setOpenLoginModal(true));
                document.body.style.overflow = "hidden";
              }}
            />
          </div>
        ) : cartsLoading ? (
          <div>Loading...</div>
        ) : carts && carts?.length < 1 ? (
          <div className={`${innerBox} gap-10`}>
            <div className="h-[319px] w-[319px] rounded-full bg-grey flex items-center justify-center">
              <Image
                src={icons.emptycart}
                alt=""
                priority
                width={237}
                height={162}
                quality={100}
              />
            </div>

            <span className="flex flex-col items-center gap-2">
              <h3 className="text-xl font-bold">
                You currently do not have any cart.
              </h3>

              <h6>Browse amazing crafts by talented creators.</h6>
            </span>

            <Link href="/" className="px-7 py-4 bg-black rounded-xl text-white">
              Go shopping
            </Link>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 gap-6 "
            style={{ scrollbarWidth: "thin" }}
          >
            {carts?.map((cart) => {
              return <CartCard key={cart.creativeId} cart={cart} />;
            })}
          </div>
        )}
      </div>
    </main>
  );
};

const cartContainer =
  "flex flex-col gap-10 p-8 border-[1px] border-grey rounded-xl h-full w-[60vw]";
const innerBox = "flex flex-col items-center justify-center h-full";

export default Cart;
