import { icons } from "@/constants";
import Image from "next/image";
import type { ChangeEventHandler } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  className?: string;
};

const SearchBox = (props: Props) => {
  return (
    <div
      className={twMerge(
        props.className,
        "relative max-w-[458px] xl:h-14 h-16"
      )}
    >
      <input
        type="search"
        className=" h-full w-full border-[1px] border-grey bg-white rounded-md pl-6 text-sm font-medium"
        value=""
        name=""
        id=""
        onChange={props.onChange}
        placeholder="Search for anything"
      />

      <button
        type="button"
        className="absolute top-3 right-3 xl:h-8 xl:w-8 h-10 w-10 bg-green rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-300 ease-in-out"
      >
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
