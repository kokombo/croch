import Link from "next/link";
import { DropDown, Logo, NavAccount } from "..";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, StateType } from "@/redux/store";
import { setOpenDropDown } from "@/redux/slices/modal";
import { signOut } from "next-auth/react";

const authenticatedCreativeLinks = [
  { label: "Dashboard", href: "/creative/dashboard" },
  { label: "Sign out", href: "/signout" },
];

const CreativeNavigationBar = () => {
  const { openDropDown } = useSelector((state: StateType) => state.modal);

  const dispatch: DispatchType = useDispatch();

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
          <DropDown>
            {authenticatedCreativeLinks.map((item, index) => {
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
            })}
          </DropDown>
        )}
      </span>
    </nav>
  );
};

export default CreativeNavigationBar;
