import { icons } from "@/constants";
import { useCurrentUser } from "@/utilities";
import Image from "next/image";
import Link from "next/link";

type Props = {
  diabled?: boolean;
};

const Logo = (props: Props) => {
  const { role, session } = useCurrentUser();

  return (
    <Link
      href={`${!session || role === "customer" ? "/" : "/creative/dashboard"}`}
      aria-disabled={props.diabled}
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
