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
  const {
    data: products,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetAllProducts();

  return (
    <main className="flex flex-col">
      <NavigationBar />

      <section className="px-[4.6%] flex items-center gap-4 border-b-[1px] border-grey w-full">
        <TagsList />

        <FilterButton />
      </section>

      <section className="px-[4.6%] py-10">
        <ProductsList
          products={products}
          isLoading={isLoading}
          isError={isError}
          error={error}
          isSuccess={isSuccess}
        />
      </section>

      <Footer />
    </main>
  );
};

export default Home;
