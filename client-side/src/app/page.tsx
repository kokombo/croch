"use client";

import { ProductCard, Slider, ProductsList, TagsList } from "@/components";

const Home = () => {
  return (
    <div className="flex flex-col gap-16 ">
      <div className=" px-[4.6%] border-b-[1px] border-grey w-full">
        <TagsList />
      </div>

      <div className="px-[4.6%]">
        <ProductsList />
      </div>
    </div>
  );
};

export default Home;
