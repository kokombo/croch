import Link from "next/link";
import { Logo, NavigationLinksCard } from "../..";
import { NavAccountButton } from "@/components/buttons";
import { SearchBox } from "@/components/input-fields";
import { useDispatch, useSelector } from "react-redux";
import type { DispatchType, StateType } from "@/redux/store";
import { setOpenDropDown } from "@/redux/slices/modal";
import { useCurrentUser } from "@/utilities";
import { usePathname } from "next/navigation";

const CustomerNavigationBar = () => {
  const { openDropDown } = useSelector((state: StateType) => state.modal);

  const { session, role } = useCurrentUser();
  const dispatch: DispatchType = useDispatch();
  const pathname = usePathname();

  const showSearchBox = Boolean(pathname === "/" || pathname === "/craft");

  return (
    <nav className="nav_container">
      <Logo />

      {showSearchBox && (
        <span className="hidden lg:inline-block w-[40%]">
          <SearchBox onChange={() => {}} />
        </span>
      )}

      <div className="flex items-center">
        {(!session || role !== "customer") && (
          <Link
            href={"/creative/home"}
            className="text-base font-medium hover:bg-gray rounded-3xl py-3 px-4 hidden lg:inline-block"
          >
            Sell Your Creative
          </Link>
        )}

        <span className="relative">
          <NavAccountButton
            onClick={() => {
              openDropDown
                ? dispatch(setOpenDropDown(false))
                : dispatch(setOpenDropDown(true));
            }}
            opened={openDropDown}
          />

          {openDropDown && <NavigationLinksCard />}
        </span>
      </div>
    </nav>
  );
};

export default CustomerNavigationBar;
