import { icons } from "@/constants";
import Image from "next/image";
import { ChangeEventHandler } from "react";

type Props = {
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
};

const SearchBox = (props: Props) => {
  return (
    <div className="relative w-[40%] max-w-[458px] xl:h-12 h-16">
      <input
        type="search"
        autoFocus={false}
        className=" h-full w-full border-[1px] border-grey rounded-md pl-6 text-sm font-medium"
        value=""
        name=""
        id=""
        onChange={props.onChange}
        placeholder="Search for anything"
      />

      <button className="absolute top-2 right-3 xl:h-8 xl:w-8 h-10 w-10 bg-green rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-300 ease-in-out">
        <Image
          src={icons.search}
          alt="search icon"
          className="xl:w-3 xl:h-3 w-4 h-4"
        />
      </button>
    </div>
  );
};

export default SearchBox;
