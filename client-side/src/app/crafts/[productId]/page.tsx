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
    <div className="px-[4.6%] py-10">
      <section>
        <h1></h1>

        <ProductImagesGrid photos={dummyProduct.photos} />

        <ProductInfo />
      </section>

      <section>
        <div>
          <ProductDescription />

          <ProductOwnerCard />
        </div>

        <div>
          <AddToCartCard />
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
  owner: {
    _id: "ABABAB23",
    firstName: "Samuel",
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
