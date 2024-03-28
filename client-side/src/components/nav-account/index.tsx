import { icons } from "@/constants";
import Image from "next/image";

type Props = {
  onClick: () => void;
  opened: boolean;
};

const NavAccount = (props: Props) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        props.onClick();
      }}
      className={`h-[46px] w-[86px] lg:w-[101px] lg:h-[56px] p-2 flex items-center justify-center gap-2 border-[1px] border-grey rounded-[100px] hover:shadow-lg ${props.opened ? "shadow-lg" : ""}`}
      aria-label="account dropdown button"
    >
      <Image
        src={icons.chevrondown}
        alt="show select options icon"
        className="w-5 h-5 lg:w-6 lg:h-6"
      />

      <span className="h-8 w-8 lg:h-10 lg:w-10 rounded-full flex items-center justify-center bg-gray">
        <Image src={icons.user} alt="user icon" className="w-[18px] h-[18px]" />
      </span>
    </button>
  );
};

export default NavAccount;
