"use client";
import { Footer, UserSegmentRedirect } from "@/components";
import { TagsList } from "@/components/tag";
import { ProductsList } from "@/components/product";
import { FilterButton } from "@/components/buttons";
import { CustomerNavigationBar } from "@/components/navigation-bars";
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
    <UserSegmentRedirect>
      <CustomerNavigationBar />

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
    </UserSegmentRedirect>
  );
};

export default Home;
