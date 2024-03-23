"use client";

import { ProductsList } from "@/components";
import { useGetWishlists } from "@/utilities/api-interactions/customer";

const WishList = () => {
  const {
    data: wishlist,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetWishlists();

  return (
    <main className="paddingX py-10">
      <ProductsList
        products={wishlist}
        isLoading={isLoading}
        isError={isError}
        error={error}
        isSuccess={isSuccess}
      />
    </main>
  );
};

export default WishList;
