"use client";

import { Location, H3, ProductInfoPageSkeleton, H6 } from "@/components";
import { CrossSellContainer } from "@/components/cross-sell";
import { AddToWishlist } from "@/components/product";
import {
  AddToCartCard,
  ProductDescription,
  ProductImagesGrid,
  ProductInfo,
  ProductOwnerCard,
  ReviewsList,
} from "@/components/product-details-page";
import { icons } from "@/constants";
import { useGetProductById } from "@/utilities/api-interactions/product";
import { useSearchParams } from "next/navigation";

const ProductInfoPage = () => {
  const params = useSearchParams();

  const craftId = params.get("craftId") as string;

  const { data: product, isLoading, isError } = useGetProductById(craftId);

  return isLoading || isError ? (
    <ProductInfoPageSkeleton />
  ) : (
    <div>
      {product && (
        <div className="paddingX lg:py-5 flex flex-col gap-15 lg:gap-18 pb-10">
          <section className="flex flex-col gap-4 lg:gap-6 py-5 border-grey border-b-[1px]">
            <div className="flex items-center justify-between">
              <H3>{product?.title}</H3>

              <span className="flex items-center text-wrap gap-1 lg:gap-2">
                <H6>Save</H6>

                <AddToWishlist
                  productId={product._id}
                  alreadyInWishlistIcon={icons.redheart}
                  notInWishlistIcon={icons.bookmark2}
                />
              </span>
            </div>

            <ProductImagesGrid photos={product.photos} />

            <span className="flex flex-col gap-4">
              <ProductInfo product={product} />

              <Location location={product.primaryLocation?.name} />
            </span>
          </section>

          <section className=" flex flex-col-reverse gap-10 lg:flex-row lg:justify-between lg:items-start w-full ">
            <div className="flex flex-col gap-10 lg:w-[58%] ">
              <ProductDescription description={product.description} />

              <ProductOwnerCard product={product} />
            </div>

            <div className="md:w-[75%] lg:w-[38%]">
              <AddToCartCard product={product} />
            </div>
          </section>

          <ReviewsList creativeId={product.owner._id} />

          <CrossSellContainer
            creativeId={product.owner._id}
            productId={product._id}
          />
        </div>
      )}
    </div>
  );
};

export default ProductInfoPage;
