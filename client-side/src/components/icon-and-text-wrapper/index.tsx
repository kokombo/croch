import Image, { StaticImageData } from "next/image";
import { H6 } from "..";

type Props = {
  icon: string | StaticImageData; //Remove staticImagedata after connecting to API
  text: string;
};

const IconAndTextWrapper = (props: Props) => {
  return (
    <article className="flex items-center gap-1">
      <Image src={props.icon} alt="" width={21} height={21} />
      <H6>{props.text}</H6>
    </article>
  );
};

export default IconAndTextWrapper;
