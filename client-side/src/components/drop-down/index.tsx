import { twMerge } from "tailwind-merge";

const DropDown = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={twMerge(
        className,
        "absolute  bg-white py-3 rounded-lg flex flex-col gap-1 w-[185px] h-fit shadow-lg z-10"
      )}
    >
      {children}
    </div>
  );
};

export default DropDown;
