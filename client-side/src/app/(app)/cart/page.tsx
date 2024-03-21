"use client";
import {
  CartCard,
  CustomButton,
  Divider,
  H3,
  ThreeDotsLoader,
} from "@/components";
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
    <main className="grid_center my-20">
      <div className="cart_container">
        <H3>Cart</H3>

        <Divider />

        {!session ? (
          <div className="flex_item_justify_center flex-col h-full gap-10">
            <div className="h-[319px] w-[319px] rounded-full bg-grey flex_item_justify_center">
              <Image
                src={icons.emptycart}
                alt=""
                priority
                width={237}
                height={162}
                quality={100}
              />
            </div>

            <span className="flex_col_center gap-2">
              <h3 className="text-xl font-bold">Your Carts will go here.</h3>

              <h6>Sign in now to see the products you{"'"}ve added.</h6>
            </span>

            <CustomButton
              type="button"
              label="Sign in"
              extraClasses="px-7 py-4 bg-white text-customblack border_grey_1 hover:bg-gray"
              onClick={() => {
                dispatch(setOpenLoginModal(true));
                document.body.style.overflow = "hidden";
              }}
            />
          </div>
        ) : cartsLoading ? (
          <div>
            <ThreeDotsLoader />
          </div>
        ) : carts && carts?.length < 1 ? (
          <div className="flex_item_justify_center flex-col h-full gap-10">
            <div className="h-[319px] w-[319px] rounded-full bg-grey flex_item_justify_center">
              <Image
                src={icons.emptycart}
                alt=""
                priority
                width={237}
                height={162}
                quality={100}
              />
            </div>

            <span className="flex_col_center gap-2">
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
            className="grid grid-cols-1 gap-6"
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

export default Cart;
