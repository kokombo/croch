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
      className={`w-[101px] h-[56px] p-2 flex items-center justify-center gap-2 border-[1px] border-grey rounded-[100px] hover:shadow-lg ${props.opened ? "shadow-lg" : ""}`}
      aria-label="account dropdown button"
    >
      <Image
        src={icons.chevrondown}
        alt="show select options icon"
        className="w-6 h-6"
      />

      <span className="h-10 w-10 rounded-full flex items-center justify-center bg-gray">
        <Image src={icons.user} alt="user icon" className="w-[18px] h-[18px]" />
      </span>
    </button>
  );
};

export default NavAccount;
