import Link from "next/link";
import { Logo, SearchBox, NavAccount } from "..";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { DispatchType } from "@/redux/store";
import { setOpenLoginModal, setOpenSignupModal } from "@/redux/slices/modal";

const unauthenticatedLinks = [
  { label: "Log in", href: "/login" },
  { label: "Sign up", href: "/signup" },
  { label: "Sell Your Creative", href: "/sell-your-creative" },
  { label: "Help center", href: "/help-center" },
];

const NavigationBar = () => {
  const [openDropDown, setOpenDropDown] = useState(false);

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

      <span className="flex items-center gap-6">
        <Link href={"/creative/home"} className="text-base font-bold">
          Sell Your Creative
        </Link>

        <span className="relative">
          <NavAccount
            onClick={() => setOpenDropDown((prev) => !prev)}
            opened={openDropDown}
          />

          {openDropDown && (
            <div className="absolute right-0 bg-white p-5 rounded-lg flex flex-col gap-5 w-[185px] h-fit shadow-lg mt-2 z-10">
              {unauthenticatedLinks.map((item, index) => {
                return (
                  <Link
                    href={item.href}
                    key={index}
                    className="text-sm font-semibold"
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
            </div>
          )}
        </span>
      </span>
    </nav>
  );
};

export default NavigationBar;
