import { icons } from "@/constants";
import Image from "next/image";

const FilterButton = () => {
  return (
    <button className="py-2 px-5 lg:py-3 lg:px-8 border-[1px] border-grey rounded-[4px] hover:shadow-lg">
      <span className="flex items-center justify-center gap-1">
        <Image
          src={icons.filter}
          alt="filter button icon"
          className="h-4 w-4 lg:h-6 lg:w-6"
        />
        <p className="text-sm lg:text-base">Filter</p>
      </span>
    </button>
  );
};

export default FilterButton;
