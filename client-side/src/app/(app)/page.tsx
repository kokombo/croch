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
    isPending,
    isStale,
  } = useGetAllProducts();

  return (
    <main className="flex flex-col">
      <NavigationBar />

      <section className="paddingX flex items-center gap-3 lg:gap-4 border-b-[1px] border-grey w-full">
        <TagsList />

        <FilterButton />
      </section>

      <section className="paddingX py-10">
        <ProductsList
          products={products}
          isLoading={isLoading}
          isError={isError}
          error={error}
          isSuccess={isSuccess}
          isPending={isPending}
          isStale={isStale}
        />
      </section>

      <Footer />
    </main>
  );
};

export default Home;
