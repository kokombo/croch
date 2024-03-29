import Link from "next/link";
import { DropDown, Logo, NavAccount } from "..";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, StateType } from "@/redux/store";
import { setOpenDropDown } from "@/redux/slices/modal";
import { signOut } from "next-auth/react";
import { useCurrentUser } from "@/utilities";
import { useGetCreativeById } from "@/utilities/api-interactions/creative";

const CreativeNavigationBar = () => {
  const { openDropDown } = useSelector((state: StateType) => state.modal);

  const dispatch: DispatchType = useDispatch();

  const { id } = useCurrentUser();

  const { data: creative } = useGetCreativeById(id);

  const authenticatedCreativeLinks = [
    {
      label: "My dashboard",
      href: `/creative/${creative?.brandName.toLowerCase()}~${creative?._id.substring(0, 16)}`,
    },

    { label: "Profile", href: "/creative/profile" },
    { label: "Sign out", href: "/signout" },
  ];

  return (
    <nav className="nav_container">
      <Logo />

      <span className="relative">
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
            {authenticatedCreativeLinks.map((item, index) => {
              return (
                <Link
                  key={index}
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
