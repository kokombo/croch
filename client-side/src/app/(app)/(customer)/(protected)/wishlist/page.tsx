"use client";

import { ProductsList } from "@/components/product";
import { useGetWishlists } from "@/utilities/api-interactions/customer";

const WishList = () => {
  const {
    data: wishlist,
    isLoading,
    isError,
    error,
    isSuccess,
    isPending,
    isStale,
  } = useGetWishlists();

  return (
    <div className="paddingX py-10">
      <ProductsList
        products={wishlist}
        isLoading={isLoading}
        isError={isError}
        error={error}
        isSuccess={isSuccess}
        isPending={isPending}
        isStale={isStale}
      />
    </div>
  );
};

export default WishList;
