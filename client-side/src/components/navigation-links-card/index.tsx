import { useCurrentUser } from "@/utilities";
import { DropDown } from "..";
import Link from "next/link";
import {
  setOpenLoginModal,
  setOpenSignupModal,
  setOpenDropDown,
} from "@/redux/slices/modal";
import { DispatchType } from "@/redux/store";
import { useDispatch } from "react-redux";
import { signOut } from "next-auth/react";

const unauthenticatedLinks = [
  { label: "Log in", href: "/login" },
  { label: "Sign up", href: "/signup" },
  { label: "Sell Your Creative", href: "/creative/home" },
  { label: "Help center", href: "/help-center" },
];

const authenticatedCustomerLinks = [
  { label: "Cart", href: "/cart" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Order", href: "/order" },
  { label: "Profile", href: "/profile" },
  { label: "Sign out", href: "/signout" },
];

const authenticatedCreativeLinks = [
  { label: "Dashboard", href: "/creative/dashboard" },
  { label: "Sign out", href: "/signout" },
];

const NavigationLinksCard = () => {
  const dispatch: DispatchType = useDispatch();

  const { session, role } = useCurrentUser();

  const openLoginModal = () => {
    dispatch(setOpenLoginModal(true));
    document.body.style.overflow = "hidden";
  };

  const openSignupModal = () => {
    dispatch(setOpenSignupModal(true));
    document.body.style.overflow = "hidden";
  };

  return (
    <DropDown extraClasses="right-0 mt-2">
      {!session &&
        unauthenticatedLinks.map((item, index) => {
          return (
            <Link
              href={item.href}
              key={index}
              className="dropdown_list_item"
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
        (role === "customer"
          ? authenticatedCustomerLinks.map((item, index) => {
              return (
                <Link
                  key={index}
                  href={item.href}
                  className="dropdown_list_item"
                  onClick={(e) => {
                    item.href === "/signout" ? e.preventDefault() : null;

                    item.href === "/signout" ? signOut() : null;
                  }}
                >
                  {item.label}
                </Link>
              );
            })
          : authenticatedCreativeLinks.map((item, index) => {
              return (
                <Link
                  key={index}
                  href={item.href}
                  className="dropdown_list_item"
                  onClick={(e) => {
                    item.href === "/signout" ? e.preventDefault() : null;

                    item.href === "/signout" ? signOut() : null;
                  }}
                >
                  {item.label}
                </Link>
              );
            }))}
    </DropDown>
  );
};

export default NavigationLinksCard;
