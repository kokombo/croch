import { icons } from "@/constants";
import Image from "next/image";

const FilterButton = () => {
  return (
    <button className="py-3 px-8 border-[1px] border-grey rounded-[4px] hover:shadow-lg">
      <span className="flex items-center justify-center gap-1">
        <Image
          src={icons.filter}
          alt="filter button icon"
          className="h-6 w-6"
        />
        <p>Filter</p>
      </span>
    </button>
  );
};

export default FilterButton;
