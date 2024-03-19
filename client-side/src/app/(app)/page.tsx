"use client";

import {
  ProductsList,
  TagsList,
  FilterButton,
  NavigationBar,
  Footer,
} from "@/components";

const Home = () => {
  return (
    <main className="flex flex-col">
      <NavigationBar />

      <section className="px-[4.6%] flex items-center gap-4 border-b-[1px] border-grey w-full">
        <TagsList />

        <FilterButton />
      </section>

      <section className="px-[4.6%] py-10">
        <ProductsList />
      </section>

      <Footer />
    </main>
  );
};

export default Home;
