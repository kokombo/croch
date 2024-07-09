import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

type Props = {
  icon: string | StaticImageData;
  label: string;
  activeTab: boolean;
};

const TagItem = (props: Props) => {
  return (
    <Link href="">
      <span
        className={`${props.activeTab ? "bg-black" : "bg-whitee"} px-4 py-[10px] lg:px-6 flex items-center justify-center gap-1 w-fit rounded-[100px]`}
      >
        <Image
          src={props.icon}
          alt="product tag icon"
          className="w-4 h-4 lg:h-6 lg:w-6"
        />

        <p
          className={`${props.activeTab ? "text-white" : "text-black"} text-sm lg:text-base font-medium`}
        >
          {props.label}
        </p>
      </span>
    </Link>
  );
};

export default TagItem;
