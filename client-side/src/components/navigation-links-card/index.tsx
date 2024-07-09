import { useCurrentUser } from "@/utilities";
import { DropDown } from "..";
import Link from "next/link";
import {
  setOpenLoginModal,
  setOpenSignupModal,
  setOpenDropDown,
} from "@/redux/slices/modal";
import type { DispatchType } from "@/redux/store";
import { useDispatch } from "react-redux";
import { signOut } from "next-auth/react";
import {
  AUTHENTICATED_CUSTOMER_LINKS,
  UNAUTHENTICATED_LINKS,
} from "@/constants/data";

const NavigationLinksCard = () => {
  const dispatch: DispatchType = useDispatch();

  const { session } = useCurrentUser();

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
        UNAUTHENTICATED_LINKS.map((item, index) => {
          return (
            <Link
              href={item.href}
              key={`${index}-${item.label}`}
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
        AUTHENTICATED_CUSTOMER_LINKS.map((item, index) => {
          return (
            <Link
              key={`${index}-${item.label}`}
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
        })}
    </DropDown>
  );
};

export default NavigationLinksCard;
