import Image, { StaticImageData } from "next/image";

type Props = {
  icon: string | StaticImageData; //Remove staticImagedata after connecting to API
  text: string;
};

const IconAndTextWrapper = (props: Props) => {
  return (
    <article className="flex items-center gap-1">
      <Image src={props.icon} alt="" width={21} height={21} />
      <h6 className="text-sm text-black font-medium">{props.text} </h6>
    </article>
  );
};

export default IconAndTextWrapper;
