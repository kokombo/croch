import Image from "next/image";
import { icons } from "@/constants";
import { H6 } from "..";

type Props = {
  location: string;
};

const Location = (props: Props) => {
  return (
    <span className="flex gap-1">
      <Image src={icons.location} alt="" height={16} width={16} />
      <H6>{props.location}</H6>
    </span>
  );
};

export default Location;
