import { icons } from "@/constants";
import { useCurrentUser } from "@/utilities";
import { useGetCreativeById } from "@/utilities/api-interactions/creative";
import Image from "next/image";
import Link from "next/link";

type Props = {
  diabled?: boolean;
};

const Logo = (props: Props) => {
  const { role, session, id } = useCurrentUser();

  const { data: creative } = useGetCreativeById(id);

  return (
    <Link
      href={`${!session || role === "customer" ? "/" : `/creative/${creative?.brandName.toLowerCase()}~${creative?._id.substring(0, 16)}`}`}
      aria-disabled={props.diabled}
    >
      <Image
        src={icons.logo}
        priority
        quality={100}
        alt="croch logo"
        className="w-[76px] h-12 lg:w-[124px] lg:h-[55px]"
      />
    </Link>
  );
};

export default Logo;
