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
    dispatch(setOpenDropDown(false));
  };

  const openSignupModal = () => {
    dispatch(setOpenSignupModal(true));
    dispatch(setOpenDropDown(false));
  };

  return (
    <DropDown className="right-0 mt-2">
      {!session && (
        <div>
          <button
            type="button"
            onClick={openLoginModal}
            className="dropdown_list_item"
          >
            Login
          </button>

          <button
            type="button"
            onClick={openSignupModal}
            className="dropdown_list_item"
          >
            Sign up
          </button>

          {UNAUTHENTICATED_LINKS.map((item, index) => {
            return (
              <Link
                key={index.toString()}
                href={item.href}
                className="dropdown_list_item"
                onClick={() => dispatch(setOpenDropDown(false))}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}

      {session && (
        <div>
          {AUTHENTICATED_CUSTOMER_LINKS.map((item, index) => {
            return (
              <Link
                key={index.toString()}
                href={item.href}
                className="dropdown_list_item"
              >
                {item.label}
              </Link>
            );
          })}

          <button
            type="button"
            onClick={() => signOut()}
            className="dropdown_list_item"
          >
            Signout
          </button>
        </div>
      )}
    </DropDown>
  );
};

export default NavigationLinksCard;
