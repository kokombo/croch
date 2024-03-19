const DropDown = ({
  children,
  extraClasses,
}: {
  children: React.ReactNode;
  extraClasses?: string;
}) => {
  return (
    <div
      className={`${extraClasses} absolute  bg-white py-3 rounded-lg flex flex-col gap-1 w-[185px] h-fit shadow-lg z-10`}
    >
      {children}
    </div>
  );
};

export default DropDown;
