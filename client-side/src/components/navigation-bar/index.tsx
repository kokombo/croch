import Link from "next/link";
import { Logo, SearchBox, NavAccount, DropDown } from "..";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { DispatchType } from "@/redux/store";
import { setOpenLoginModal, setOpenSignupModal } from "@/redux/slices/modal";
import { useCurrentUser } from "@/utilities";
import { signOut } from "next-auth/react";

const unauthenticatedLinks = [
  { label: "Log in", href: "/login" },
  { label: "Sign up", href: "/signup" },
  { label: "Sell Your Creative", href: "/creative/home" },
  { label: "Help center", href: "/help-center" },
];

const authenticatedLinks = [
  { label: "Profile", href: "/Profile" },
  { label: "Sign out", href: "/signout" },
];

const NavigationBar = () => {
  const [openDropDown, setOpenDropDown] = useState(false);

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
    <nav className="w-full flex items-center justify-between py-[18px] px-[4.6%] border-b-[1px] border-grey">
      <Logo />

      <SearchBox onChange={() => {}} />

      <span className="flex items-center gap-2">
        {(!session || role !== "customer") && (
          <Link
            href={"/creative/home"}
            className="text-base font-semibold hover:bg-gray rounded-3xl py-3 px-4"
          >
            Sell Your Creative
          </Link>
        )}

        <span className="relative">
          <NavAccount
            onClick={() => setOpenDropDown((prev) => !prev)}
            opened={openDropDown}
          />

          {openDropDown && (
            <DropDown>
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
      </span>
    </nav>
  );
};

export default NavigationBar;
