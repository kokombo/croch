"use client";

import {
  ProductsList,
  TagsList,
  FilterButton,
  NavigationBar,
  Footer,
} from "@/components";
import { useGetAllProducts } from "@/utilities/api-interactions/product";

const Home = () => {
  const { data: products } = useGetAllProducts();

  return (
    <div className="flex flex-col">
      <NavigationBar />

      <div className="px-[4.6%] flex items-center gap-4 border-b-[1px] border-grey w-full">
        <TagsList />

        <FilterButton />
      </div>

      <div className="px-[4.6%] py-10">
        <ProductsList products={products} />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
