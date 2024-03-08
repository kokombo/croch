"use client";

import {
  ProductCard,
  Slider,
  ProductsList,
  TagsList,
  FilterButton,
} from "@/components";

const Home = () => {
  return (
    <div className="flex flex-col">
      <div className="px-[4.6%] flex items-center gap-4 border-b-[1px] border-grey w-full">
        <TagsList />

        <FilterButton />
      </div>

      <div className="px-[4.6%] py-10">
        <ProductsList />
      </div>
    </div>
  );
};

export default Home;
