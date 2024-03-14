const DropDown = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="absolute right-0 bg-white py-3 rounded-lg flex flex-col gap-1 w-[185px] h-fit shadow-lg mt-2 z-10">
      {children}
    </div>
  );
};

export default DropDown;
