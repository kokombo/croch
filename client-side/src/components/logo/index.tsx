import { icons } from "@/constants";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src={icons.logo}
        priority
        quality={100}
        alt="croch logo"
        className="w-[124px] h-[55px]"
      />
    </Link>
  );
};

export default Logo;
