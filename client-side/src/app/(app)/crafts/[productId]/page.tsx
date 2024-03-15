"use client";

import {
  AddToCartCard,
  ProductDescription,
  ProductImagesGrid,
  ProductInfo,
  ProductOwnerCard,
} from "@/components";

const ProductInfoPage = () => {
  return (
    <div className="px-[4.6%]">
      <section className="flex flex-col gap-6 py-10 border-grey border-b-[1px]">
        <h1 className="text-[28px] leading-[22px] font-bold text-customblack">
          {dummyProduct.title}
        </h1>

        <ProductImagesGrid photos={dummyProduct.photos} />

        <ProductInfo product={dummyProduct} />
      </section>

      <section className="py-10 flex justify-between items-start w-full">
        <div className="flex flex-col gap-[60px] w-[58%] ">
          <ProductDescription description={dummyProduct.description} />

          <ProductOwnerCard creative={dummyCreative} product={dummyProduct} />
        </div>

        <div className="w-[34%]">
          <AddToCartCard product={dummyProduct} />
        </div>
      </section>
    </div>
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
