import { icons } from "@/constants";
import { useCurrentUser } from "@/utilities";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  const { role, session } = useCurrentUser();

  return (
    <Link
      href={`${!session || role === "customer" ? "/" : "/creative/dashboard"}`}
    >
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
