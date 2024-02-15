const DropBox = ({
  children,
  extraClasses,
}: {
  children: React.ReactNode;
  extraClasses: string;
}) => {
  return (
    <div className={`absolute bg-white h-fit p-4 ${extraClasses}`}>
      {children}
    </div>
  );
};

export default DropBox;
