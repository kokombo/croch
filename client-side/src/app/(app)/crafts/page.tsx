"use client";

import {
  AddToCartCard,
  AddToWishlist,
  ProductDescription,
  ProductImagesGrid,
  ProductInfo,
  ProductOwnerCard,
  ReviewsList,
} from "@/components";
import { icons } from "@/constants";
import { useGetProductById } from "@/utilities/api-interactions/product";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const ProductInfoPage = () => {
  const params = useSearchParams();

  const craftId = params.get("craftId");

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useGetProductById(craftId as string);

  return (
    <>
      {isLoading ? (
        <span>Loading.... </span>
      ) : isError ? (
        <span>{error?.response?.data.message} </span>
      ) : (
        <>
          {product && (
            <div className="px-[4.6%]">
              <section className="flex flex-col gap-6 py-10 ">
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-bold text-customblack">
                    {product?.title}
                  </h1>

                  <span className="flex items-center gap-2">
                    <h6 className="text-sm text-customblack ">
                      Add to wishlist
                    </h6>

                    <AddToWishlist
                      productId={product._id}
                      icon={icons.bookmark2}
                    />
                  </span>
                </div>

                <ProductImagesGrid photos={product.photos} />

                <span className="flex flex-col gap-2">
                  <ProductInfo product={product} />

                  <span className="flex gap-1">
                    <Image src={icons.location} alt="" height={16} width={16} />
                    <h6>{product?.primaryLocation?.name}</h6>
                  </span>
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
        </>
      )}
    </>
  );
};

export default ProductInfoPage;
