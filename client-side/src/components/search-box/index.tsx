import { icons } from "@/constants";
import Image from "next/image";
import { ChangeEventHandler } from "react";

type Props = {
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
};

const SearchBox = (props: Props) => {
  return (
    <div className="relative w-[40%] h-16">
      <input
        type="search"
        autoFocus={false}
        className="h-full w-full border-[1px] border-grey rounded-md outline-none pl-6 text-base font-medium"
        value=""
        name=""
        id=""
        onChange={props.onChange}
        placeholder="Search for anything"
      />

      <button className="absolute top-3 right-6 h-10 w-10 bg-green rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-300 ease-in-out">
        <Image src={icons.search} alt="search icon" className="w-4 h-4" />
      </button>
    </div>
  );
};

export default SearchBox;
