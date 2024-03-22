"use client";
import {
  AddToCartCard,
  AddToWishlist,
  ProductDescription,
  ProductImagesGrid,
  ProductInfo,
  ProductOwnerCard,
  ReviewsList,
  Location,
  H3,
  ProductInfoPageSkeleton,
  H6,
} from "@/components";
import { icons } from "@/constants";
import { useGetProductById } from "@/utilities/api-interactions/product";
import { useSearchParams } from "next/navigation";

const ProductInfoPage = () => {
  const params = useSearchParams();

  const craftId = params.get("craftId") as string;

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useGetProductById(craftId);

  return isLoading || isError ? (
    <ProductInfoPageSkeleton />
  ) : (
    <div>
      {product && (
        <div className="paddingX">
          <section className="flex flex-col gap-6 py-10 ">
            <div className="flex items-center justify-between">
              <H3>{product?.title}</H3>

              <span className="flex items-center gap-2">
                <H6>Save</H6>

                <AddToWishlist productId={product._id} icon={icons.bookmark2} />
              </span>
            </div>

            <ProductImagesGrid photos={product.photos} />

            <span className="flex flex-col gap-4">
              <ProductInfo product={product} />

              <Location location={product.primaryLocation?.name} />
            </span>
          </section>

          <section className="py-10 flex justify-between items-start w-full border-grey border-y-[1px]">
            <div className="flex flex-col gap-[60px] w-[58%] ">
              <ProductDescription description={product.description} />

              <ProductOwnerCard product={product} />
            </div>

            <div className="w-[34%]">
              <AddToCartCard product={product} />
            </div>
          </section>

          <ReviewsList />
        </div>
      )}
    </div>
  );
};

export default ProductInfoPage;
