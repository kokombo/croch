import Link from "next/link";
import { DropDown, Logo } from "../..";
import { NavAccountButton } from "@/components/buttons";
import { useDispatch, useSelector } from "react-redux";
import type { DispatchType, StateType } from "@/redux/store";
import { setOpenDropDown } from "@/redux/slices/modal";
import { signOut } from "next-auth/react";
import { useCurrentUser } from "@/utilities";
import { useGetCreativeById } from "@/utilities/api-interactions/creative";

const CreativeNavigationBar = () => {
  const { isDropDownOpen } = useSelector((state: StateType) => state.modal);
  const dispatch: DispatchType = useDispatch();
  const { id, isCreative } = useCurrentUser();
  const { data: creative } = useGetCreativeById(id, isCreative);

  const authenticatedCreativeLinks = [
    {
      label: "My dashboard",
      href: `/creative/dashboard/${creative?.brandName?.toLowerCase()}~${creative?._id?.substring(
        0,
        16
      )}`,
    },

    { label: "Profile", href: "/creative/profile" },
    { label: "Sign out", href: "/signout" },
  ];

  return (
    <nav className="nav_container">
      <Logo />

      <span className="relative">
        <NavAccountButton
          onClick={() => {
            isDropDownOpen
              ? dispatch(setOpenDropDown(false))
              : dispatch(setOpenDropDown(true));
          }}
          opened={isDropDownOpen}
        />

        {isDropDownOpen && (
          <DropDown extraClasses="right-0 mt-2">
            {authenticatedCreativeLinks.map((item, index) => {
              return (
                <Link
                  key={`${index}-${item.label}`}
                  href={item.href}
                  className="dropdown_list_item"
                  onClick={(e) => {
                    item.href === "/signout" ? e.preventDefault() : null;

                    item.href === "/signout"
                      ? signOut({ callbackUrl: "/" })
                      : null;
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </DropDown>
        )}
      </span>
    </nav>
  );
};

export default CreativeNavigationBar;
