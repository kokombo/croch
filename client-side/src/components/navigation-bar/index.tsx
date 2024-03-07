import Link from "next/link";
import { Logo, SearchBox, NavAccount } from "..";

const NavigationBar = () => {
  return (
    <nav className=" w-full flex items-center justify-between py-[30px] border-b-[1px] border-grey">
      <Logo />

      <SearchBox />

      <span className="flex items-center gap-6">
        <Link href={"/"}>Sell Your Creative</Link>

        <NavAccount />
      </span>
    </nav>
  );
};

export default NavigationBar;
