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

                <ProductInfo product={product} />
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

const dummyProduct = {
  _id: "2343434",
  title: "Product A",
  availability: "Available",
  price: 4000,
  description: "This is an amazing product",
  gender: "male",
  tag: "beenie",
  colors: ["green", "red", "yellow"],
  nationwideDelivery: true,
  rating: 4.5,
  numberOfReviews: 30,
  owner: {
    _id: "ABABAB23",
    firstName: "Samuel",
    lastName: "Oluwanbowa",
    picture: "/cp.png",
  },
  photos: [
    "/product1.png",
    "/sp.png",
    "/cp.png",
    "/sp.png",
    "/cp.png",
    "/sp.png",
    "/cp.png",
    "/sp.png",
    "/cp.png",
    "/sp.png",
    "/cp.png",
  ],
  sizes: ["", "", ""],
  primaryLocation: {
    minDeliveryDays: 2,
    maxDeliveryDays: 5,
  },
  otherLocations: {
    minDeliveryDays: 5,
    maxDeliveryDays: 7,
  },
};

const dummyCreative = {
  brandName: "Nicole Crochet Store",
  brandLogo: "/cp.png",
  funFacts: [
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. ",
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. ",
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. ",
  ],
  isAvailable: true,
  superCreative: false,
  personalDescription:
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa",
  yearsOfExperience: 3,
  _id: "23DEDF44F44",
  accountSetupDone: true,
  identityVerified: false,
};
