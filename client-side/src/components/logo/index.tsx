import { icons } from "@/constants";
import Image from "next/image";

const Logo = () => {
  return (
    <button>
      <Image src={icons.logo} alt="croch logo" className="w-[124px] h-[55px]" />
    </button>
  );
};

export default Logo;
