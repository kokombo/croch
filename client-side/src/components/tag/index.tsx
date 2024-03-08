import Image, { StaticImageData } from "next/image";

type Props = {
  icon: string | StaticImageData;
  label: string;
  activeTab: boolean;
};

const Tag = (props: Props) => {
  return (
    <div
      className={`${props.activeTab ? "bg-black" : "bg-fadeWhite"} py-[10px] px-6 flex items-center justify-center gap-1 w-fit rounded-[100px]`}
    >
      <Image src={props.icon} alt="product tag icon" className="h-6 w-6" />

      <p
        className={`${props.activeTab ? "text-white" : "text-black"} text-base font-medium`}
      >
        {props.label}
      </p>
    </div>
  );
};

export default Tag;
