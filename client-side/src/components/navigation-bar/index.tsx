import Link from "next/link";
import { Logo, SearchBox, NavAccount, DropDown } from "..";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, StateType } from "@/redux/store";
import {
  setOpenLoginModal,
  setOpenSignupModal,
  setOpenDropDown,
} from "@/redux/slices/modal";
import { useCurrentUser } from "@/utilities";
import { signOut } from "next-auth/react";
import { useGetCreativeById } from "@/utilities/api-interactions/creative";

const unauthenticatedLinks = [
  { label: "Log in", href: "/login" },
  { label: "Sign up", href: "/signup" },
  { label: "Sell Your Creative", href: "/creative/home" },
  { label: "Help center", href: "/help-center" },
];

const authenticatedLinks = [
  { label: "Cart", href: "/cart" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Profile", href: "/profile" },
  { label: "Sign out", href: "/signout" },
];

const NavigationBar = () => {
  const { openDropDown } = useSelector((state: StateType) => state.modal);

  const { session, role } = useCurrentUser();

  const dispatch: DispatchType = useDispatch();

  const openLoginModal = () => {
    dispatch(setOpenLoginModal(true));
    document.body.style.overflow = "hidden";
  };

  const openSignupModal = () => {
    dispatch(setOpenSignupModal(true));
    document.body.style.overflow = "hidden";
  };

  return (
    <nav className="w-full flex items-center justify-between h-[100px] px-[4.6%] border-b-[1px] border-grey">
      <Logo />

      <SearchBox onChange={() => {}} />

      <div className="flex items-center">
        {(!session || role !== "customer") && (
          <Link
            href={"/creative/home"}
            className="text-base font-semibold hover:bg-gray rounded-3xl py-3 px-4"
          >
            Sell Your Creative
          </Link>
        )}

        <span className=" relative">
          <NavAccount
            onClick={() => {
              openDropDown
                ? dispatch(setOpenDropDown(false))
                : dispatch(setOpenDropDown(true));
            }}
            opened={openDropDown}
          />

          {openDropDown && (
            <DropDown extraClasses="right-0 mt-2">
              {!session &&
                unauthenticatedLinks.map((item, index) => {
                  return (
                    <Link
                      href={item.href}
                      key={index}
                      className="text-sm font-semibold hover:bg-gray px-5 py-3"
                      onClick={(e) => {
                        item.href === "/login"
                          ? e.preventDefault()
                          : item.href === "/signup"
                            ? e.preventDefault()
                            : null;

                        item.href === "/login"
                          ? openLoginModal()
                          : item.href === "/signup"
                            ? openSignupModal()
                            : null;

                        setOpenDropDown(false);
                      }}
                    >
                      {item.label}
                    </Link>
                  );
                })}

              {session &&
                authenticatedLinks.map((item, index) => {
                  return (
                    <Link
                      key={index}
                      href={item.href}
                      className="text-sm font-semibold hover:bg-gray px-5 py-3"
                      onClick={(e) => {
                        item.href === "/signout" ? e.preventDefault() : null;

                        item.href === "/signout" ? signOut() : null;
                      }}
                    >
                      {item.label}
                    </Link>
                  );
                })}
            </DropDown>
          )}
        </span>
      </div>
    </nav>
  );
};

export default NavigationBar;
