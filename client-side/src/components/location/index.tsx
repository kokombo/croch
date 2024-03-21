import Image from "next/image";
import { icons } from "@/constants";

type Props = {
  location: string;
};

const Location = (props: Props) => {
  return (
    <span className="flex gap-1">
      <Image src={icons.location} alt="" height={16} width={16} />
      <h6>{props.location}</h6>
    </span>
  );
};

export default Location;
