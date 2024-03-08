import Link from "next/link";
import { Logo, SearchBox, NavAccount } from "..";

const NavigationBar = () => {
  return (
    <nav className="w-full flex items-center justify-between py-[18px] px-[4.6%] border-b-[1px] border-grey">
      <Logo />

      <SearchBox />

      <span className="flex items-center gap-6">
        <Link href={"/"} className="text-base font-bold">
          Sell Your Creative
        </Link>

        <NavAccount />
      </span>
    </nav>
  );
};

export default NavigationBar;
